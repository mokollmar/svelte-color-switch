import pkg from '../../../../package.json'

let prefix = `Package: ${JSON.stringify(pkg.name)} =>`

function ColorDelay_check(css_variables) {
    try {
        check(css_variables);
    } catch (error) {
        console.error("\n" + error.message + "\n");
        process.exit(1);
    }
}

function check(css_variables) {
    if (!css_variables) {
        throw new Error(`${prefix} The parameter "css_variables" is required for the <ColorDelay/> component`);
    } else if (!css_variables === Array) {
        throw new Error(`${prefix}  The parameter "css_variables" must be of type Array for the <ColorDelay/> component`);
    }
}

export { ColorDelay_check }