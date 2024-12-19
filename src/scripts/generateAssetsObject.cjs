const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../src/assets');
const outputPath = path.join(__dirname, './Assets.ts');

const fileImports = [];
const indexEntries = [];

function generateFileContent(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const parentDir = path.basename(path.dirname(filePath));
    const grandparentDir = path.basename(path.dirname(path.dirname(filePath)));

    const filteredParentDir = parentDir === 'assets' ? '' : `${parentDir.replace(/[^a-zA-Z0-9]/g, '_')}_`;
    const filteredGrandparentDir = grandparentDir === 'assets' ? '' : `${grandparentDir.replace(/[^a-zA-Z0-9]/g, '_')}_`;

    const importName = `${filteredGrandparentDir}${filteredParentDir}${fileName.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const relativePath = `./${path.relative(__dirname, filePath).replace(/\\/g, '/')}`;

    fileImports.push(`import ${importName} from "${relativePath}";`);
    indexEntries.push(`  ${importName}: ${importName}`);
}

function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            generateFileContent(filePath);
        } else if (stat.isDirectory()) {
            walkDir(filePath);
        }
    }
}

// Start walking through the directory
walkDir(directoryPath);

const fileContent = `${fileImports.join('\n')}

export const ASSETS = {
${indexEntries.join(',\n')}
};
`;

fs.writeFileSync(outputPath, fileContent);

console.log('Assets.ts has been generated successfully!');
