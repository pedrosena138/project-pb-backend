module.exports = {
    "env": {
        "es2022": true,
        "node": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "rules": {
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-unsafe-argument": "off"
    }
}
