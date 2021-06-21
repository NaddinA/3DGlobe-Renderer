// vertex.glsl changes position of vertices according to specified axi. It also contains all the data related to the vertices of our 3D object.
// a matrix is an array written in square format to represent groupings of the same type of data such as vertex positions.
// we cannot map our texture thru the fragment shader without the vertex position data, which is only available here in the vertex.glsl
// so we use something called 'varying' to pass any data related to vertices to fragment.glsl, and its "varying" because we loop over variable vertex data.
// see atmosphereVertex.glsl for why I used normalize.

varying vec2 vertexUV;
varying vec3 vertexNormal;
void main() 
{
  vertexUV = uv;
  vertexNormal = normalize(normalMatrix * normal);

  //determine how our verticies will be displayed on screen within 2d space based off of our geometry's coords.
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); 
}