import { NodeObs } from "obs-studio-node-primary";

//@ts-ignore
function setSetting(category, parameter, value) {
    let oldValue;
  
    // Getting settings container
    const settings = NodeObs.OBS_settings_getSettings(category).data;
  //@ts-ignore
    settings.forEach(subCategory => {
        //@ts-ignore
      subCategory.parameters.forEach(param => {
        if (param.name === parameter) {
          oldValue = param.currentValue;
          param.currentValue = value;
        }
      });
    });
  
    // Saving updated settings container
    if (value != oldValue) {
      NodeObs.OBS_settings_saveSettings(category, settings);
    }
  }
  //@ts-ignore
  function getAvailableValues(category, subcategory, parameter) {
    const categorySettings = NodeObs.OBS_settings_getSettings(category).data;
    if (!categorySettings) {
      console.warn(`There is no category ${category} in OBS settings`);
      return [];
    }
  //@ts-ignore
    const subcategorySettings = categorySettings.find(sub => sub.nameSubCategory === subcategory);
    if (!subcategorySettings) {
      console.warn(`There is no subcategory ${subcategory} for OBS settings category ${category}`);
      return [];
    }
  //@ts-ignore
    const parameterSettings = subcategorySettings.parameters.find(param => param.name === parameter);
    if (!parameterSettings) {
      console.warn(`There is no parameter ${parameter} for OBS settings category ${category}.${subcategory}`);
      return [];
    }
  //@ts-ignore
    return parameterSettings.values.map( value => Object.values(value)[0]);
  }
export {setSetting, getAvailableValues};
