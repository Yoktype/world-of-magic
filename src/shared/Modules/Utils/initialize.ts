export default function init(folder: Folder) {
    const Table = folder.GetChildren();
    for (const v of Table) {
        if ( v.IsA("ModuleScript") ) {
            const module = require(v) as ModuleScript;
        }
    }
}