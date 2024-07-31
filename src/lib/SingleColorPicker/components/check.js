import pkg from '../../../../package.json'

let prefix = `Package: ${JSON.stringify(pkg.name)} =>`
let HTMLelement = "<SingleColorPicker/>"

function SingleColorPicker_check({ list_of_colors, css_variable, className, itemClass }) {
    try {
        check({
            className: className,
            css_variable: css_variable,
            itemClass: itemClass,
            list_of_colors: list_of_colors,
        });
    } catch (error) {
        console.error("\n" + error.message + "\n");
        process.exit(1);
    }
}

function check({ list_of_colors, css_variable, className, itemClass }) {



    if (!list_of_colors) {
        throw new Error(`${prefix} The parameter "list_of_colors" is required for the ${HTMLelement} component`);
    } else if (!list_of_colors.constructor === Array) {
        throw new Error(`${prefix} The parameter "list_of_colors" must be of type Array for the ${HTMLelement} component\nExample: const colors = ["#00A3FF", "#FF4848", ... ];`);
    } else {
        list_of_colors.forEach(element => {
            const regex = new RegExp('#[A-Fa-f0-9]{6}');
            if (!regex.test(element)) {
                throw new Error(`${prefix} Every item in "list_of_colors" paramter must be in this format: "#FFFFFF" for the ${HTMLelement} component`);
            }
        });
    }

    if (!css_variable || !css_variable.length > 0) {
        throw new Error(`${prefix} The parameter "css_variable" is required for the ${element} component`);
    } else if (!css_variable.constructor === String) {
        throw new Error(`${prefix} The parameter "css_variable" must be of type String for the ${HTMLelement} component`);
    }

    if (!className.constructor === String) {
        throw new Error(`${prefix} The parameter "className" must not be empty for the ${HTMLelement} component`);
    }

    if (!itemClass.constructor === String) {
        throw new Error(`${prefix} The parameter "className" must not be empty for the ${HTMLelement} component`);
    }
}

export { SingleColorPicker_check }