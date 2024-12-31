const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../src/assets/SvgReactComponents');

const getAllSvgFiles = (dir, files) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            getAllSvgFiles(fullPath, files);
        } else if (path.extname(fullPath) === '.svg') {
            files.push(fullPath);
        }
    });
    return files;
};

const convertToUtf8 = (filePath) => {
    const buffer = fs.readFileSync(filePath); // Read as buffer
    const content = buffer.toString('utf8'); // Convert buffer to UTF-8 string
    fs.writeFileSync(filePath, content, 'utf8'); // Write the UTF-8 string to the file
    console.log(`Converted file to UTF-8: ${filePath}`);
};

const svgFiles = getAllSvgFiles(assetsDir, []);

svgFiles.forEach(svgFile => {
    const relativePath = path.relative(assetsDir, svgFile);
    const outputFilePath = path.join(outputDir, relativePath.replace('.svg', '.tsx'));
    const outputDirPath = path.dirname(outputFilePath);

    console.log(`Converting: ${svgFile}`);
    console.log(`Output Directory: ${outputDirPath}`);
    console.log(`Output File Path: ${outputFilePath}`);

    fs.mkdirSync(outputDirPath, { recursive: true });

    // Use `>` to redirect the output to the file
    const command = `npx @svgr/cli --icon --typescript ${svgFile} > ${outputFilePath}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error converting file: ${svgFile}`, error);
            console.error(`stderr: ${stderr}`);
        } else {
            console.log(`Successfully converted: ${svgFile}`);
            console.log(`stdout: ${stdout}`);
            convertToUtf8(outputFilePath); // Convert the output file to UTF-8
        }
    });
});
