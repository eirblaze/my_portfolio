export default ($header:JQuery):number => {
  if ($header.length < 1) {
    return 0
  }
  const header_height = $header.height()
  if ( header_height === undefined ) {
    return 0
  }
  return header_height
}
