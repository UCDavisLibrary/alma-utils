import fetch from 'node-fetch';
import { parseXmlResponse, stripLineBreaks, getSchema, formatResults } from '../utils/xml.utils';

const FORMATS = {
  XML: 'xml',
  JSON: 'json'
}

const fetchReport = async ( config, endpoint, path, format = FORMATS.XML ) => {
  const limit = 1000;
  const url =  `${ config.host }/${ endpoint }?apikey=${ config.apiKey }&limit=${ limit }`;

  let responseXml = [];
  let responseJson = [];

  try {
    validateFormat( format );

    const xml = await fetch( `${ url }&path=${ path }` ).then( res => res.text() );
    responseXml.push( xml );

    const json = parseXmlResponse( xml );
    responseJson.push( json );

    let isFinished = json.report.QueryResult.IsFinished._text === 'true';
    const resumptionToken = json.report.QueryResult.ResumptionToken._text;

    // https://developers.exlibrisgroup.com/blog/Working-with-Analytics-REST-APIs/
    while( !isFinished ) {
      let nextXml = await fetch( `${ url }&token=${ resumptionToken }` ).then( res => res.text() );
      responseXml.push( nextXml );

      let nextJson = parseXmlResponse( nextXml );
      responseJson.push( nextJson );

      isFinished = nextJson.report.QueryResult.IsFinished._text === 'true';
    }

    switch ( format ) {
      case FORMATS.XML:
        return responseXml;
      case FORMATS.JSON:
        return responseJson;
    }
  } catch( e ) {
    console.error( e );
  }
}

const validateFormat = ( format ) => {
  if( !Object.values( FORMATS ).includes( format ) ) {
    const supportedFormatsString = Object.values( FORMATS )
      .reduce(( acc, curr, i ) => (
        i === 0
          ? `'${ curr }'`
          : `${ acc }, '${ curr }'`
      ), '' );

    throw new Error(
      `\nUnsupported value in argument "format": '${ format }'\nSupported values: ${ supportedFormatsString }`
    );
  }
}

export default fetchReport;
