const dateien = [
    "main.js",
    "preload.js",
    "src/modules/downloader.js",
    "src/modules/fileManager.js",
    "src/modules/minecraftManager.js",
    "src/renderer.js"
];

dateien.forEach(async (datei) => {
    try {
        await import(`./${datei}`);
    } catch (error) {
        console.error('Fehler beim Importieren der Datei:', datei, error+error.stack);
    }
});