export default function init(folder: Folder) {
    const folderArray = folder.GetChildren();
    for (const module of folderArray) {
        if (module.IsA("ModuleScript")) {
            const moduleRequire = require(module) as ModuleScript;
        }
    }
}