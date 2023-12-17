const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
     
    }
    return value;
  };
  
  
  const videoLink = (value, helpers) => {
    if (
      !value.match(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
      )
    ) {
      return helpers.message("Invalid Youtube Video Link");
    }
    return value;
  };  
  
  module.exports = {objectId, videoLink}