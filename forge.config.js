const path = require("path")
module.exports={
    "packagerConfig": {
        "icon":path.join(__dirname, "icon.ico"),
        "overwrite":true
    },
    "makers": [
        {
            "name": "@electron-forge/maker-squirrel",
            "config": {
                "name": "my_electron_app",
                "iconUrl": path.join(__dirname, "icon.ico"),
                "setupIcon": path.join(__dirname, "icon.ico")
            }
        },
        {
            "name": "@electron-forge/maker-zip",
            "platforms": [
                "darwin"
            ]
        },
        {
            "name": "@electron-forge/maker-deb",
            "config": {}
        },
        {
            "name": "@electron-forge/maker-rpm",
            "config": {}
        }
    ]
}