import path from 'path';
import fs from 'fs';

const { SERVICE_NAME = ''} = process.env;

if (!SERVICE_NAME) {
    throw new Error('SERVICE_NAME is required env for generate html resources');
}

function generateHtmlResources(): void {
    import(`../build/${SERVICE_NAME}/ssr/ssr.js`).then(({ default: pages }: { default: { pages: Record<string, string>}}) => {
        const directoryPath = path.resolve(__dirname, `../build/${SERVICE_NAME}/html-resources`);

        if (!fs.existsSync(directoryPath)){
            fs.mkdirSync(directoryPath, { recursive: true });
        } else {
            fs.rmSync(directoryPath, { recursive: true });
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const indexHtml = fs.readFileSync(path.resolve(__dirname, `../build/${SERVICE_NAME}/app/index.html`)).toString();
        Object.keys(pages).forEach((pageName) => {
            fs.writeFileSync(`${directoryPath}/${pageName.toLowerCase()}.html`, indexHtml.replace('{{content}}', pages[pageName]));
        });
    })
    .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Error while saving pages markup:', err);
    });
}

generateHtmlResources();
