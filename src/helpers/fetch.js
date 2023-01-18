
export const requestPost = async ( url, callback, data ) => {
  const formData = new FormData();
  
  for ( const key in data ) {
    formData.append( key , data[key] );
  }

  return await fetch( url , {
      method: "POST",
      body: formData,
  } )
  .then( ( response ) => response.json() )
  .then( ( data ) => {
      return callback( data );
  } )
  .catch( ( error ) => {
      throw error
  } );
}

export const requestGet = async ( url, callback ) => {

  return await fetch( url , {method: "GET"} )
  .then( ( response ) => response.json() )
  .then( ( data ) => {
      return callback( data );
  } )
  .catch( ( error ) => {
      throw error
  } );
}