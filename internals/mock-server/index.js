import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

const mockFileBase = '/internals/mock-api/';

function sendMockFile(req, res, filePath) {
  fs.readFile(
    path.join(process.cwd(), `${mockFileBase}${filePath}`),
    'utf8',
    (err, data) => {
      if (err) {
        res.status(500).send({ error: 'Failed to read mock data file.' });
        return;
      }
      res.send(JSON.parse(data));
    },
  );
}

export async function addMockAPI(app, httpConstantsPath) {
  try {
    const httpConstants = await import(httpConstantsPath);
    app.use(bodyParser.json());
    app.get(httpConstants.BASE_URL, (req, res) => {
      sendMockFile(req, res, filePath);
    });
  } catch (err) {
    console.warn('Could not load HTTP constants:', err.message);
  }
}

export const mock = { addMockAPI };
export default mock;
