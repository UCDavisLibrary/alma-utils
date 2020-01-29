import convert from 'xml-js';

export const parseXmlResponse = ( xml ) => {
  const options = {
    compact: true,
    spaces: 0
  }

  return convert.xml2js( xml, options );
}
