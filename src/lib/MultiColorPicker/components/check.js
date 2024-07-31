import pkg from '../../../../package.json'

let prefix = `Package: ${JSON.stringify(pkg.name)} =>`
let HTMLelement = "<MultiColorPicker/>"


//  const multiConfig = [

//    [
//         { css_variable: "--color-primary-demo", color: "#00A3FF" },
//         { css_variable: "--color-secondary-demo", color: "#31CDFF" },
//         { css_variable: "--color-bg-demo", color: "#FFFFFF" },
//    ],

//    [
//             { css_variable: "--color-primary-demo", color: "#FF4848" },
//             { css_variable: "--color-secondary-demo", color: "#FF8088" },
//             { css_variable: "--color-bg-demo", color: "#0000" },
//     ],

//     [
//             { css_variable: "--color-primary-demo", color: "#FFFFFF" },
//             { css_variable: "--color-secondary-demo", color: "#9E9E9E" },
//             { css_variable: "--color-bg-demo", color: "#0000" },
//     ],

// ];



// - correct arrays inside arrays format
// - correct keys and same amount of items and arrays in every array


function MultiColorPicker_check({ multi_config, className, itemClass }) {
    try {
        check({
            multi_config: multi_config,
            className: className,
            itemClass: itemClass,
        });
    } catch (error) {
        console.error("\n" + error.message + "\n");
        process.exit(1);
    }
}

function check({ multi_config, className, itemClass }) {

    if (!multi_config) {
        throw new Error(`${prefix} The parameter "multi_config" is required for the ${HTMLelement} component`);
    } else if (!multi_config.constructor === Array) {
        throw new Error(`${prefix} The parameter "multi_config" must be of type Array for the ${HTMLelement} component`);
    } else {
        multi_config.forEach(element => {

            element.forEach(color_item => {
                const regex = new RegExp('#[A-Fa-f0-9]{6}');
                if (!regex.test(color_item.color)) {
                    throw new Error(`${prefix} Every color item in the "multi_config" paramter must be in this format: "#FFFFFF" for the ${HTMLelement} component`);
                }
                if (!color_item.css_variable) {
                    throw new Error(`${prefix} Every css_variable item in the "multi_config" paramter must not be undefined for the ${HTMLelement} component`);
                }
                if (!color_item.css_variable === String) {
                    throw new Error(`${prefix} Every css_variable item in the "multi_config" paramter must be of type String for the ${HTMLelement} component`);
                }
            });
        });
    }

    if (!className.constructor === String) {
        throw new Error(`${prefix} The parameter "className" must not be empty for the ${HTMLelement} component`);
    }

    if (!itemClass.constructor === String) {
        throw new Error(`${prefix} The parameter "className" must not be empty for the ${HTMLelement} component`);
    }
}

export { MultiColorPicker_check }