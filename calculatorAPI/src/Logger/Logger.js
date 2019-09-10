import stringify from 'json-stringify-safe';
export default class Logger {
  trace(description, content) {
    console.log(
      stringify(
        { description, content, timestamp: new Date().toISOString() },
        null,
        2
      )
    );
  }
}
