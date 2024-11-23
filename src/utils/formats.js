

  


function putFullName (name,lastName) {
  
    return  `${name} ${lastName}`.toLowerCase();
}

function capitalizeName(name) {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  


export  {
    capitalizeName,
    putFullName
}