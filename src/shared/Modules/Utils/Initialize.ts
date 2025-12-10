export default function initialize(folder: Folder) {
    if ( folder === undefined || folder.IsA("Folder") === false ) return;
    const Table = folder.GetChildren();
    for (const v of Table) {
        if ( v.IsA("ModuleScript") ) {
            const module = require(v) as ModuleScript;
        }
    }
}