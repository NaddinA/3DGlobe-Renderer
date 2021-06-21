// we are normalizing the vertex normal to fix a shader bug where a lighting miscalculation happens due to the atmospheric effect's vertices overlapping on animation.
// normalMatrix recalculate's the object's lighting for us each frame 

varying vec3 vertexNormal;
void main() 
{
  vertexNormal = normalize(normalMatrix * normal);

  //determine how our verticies will be displayed on screen within 2d space based off of our geometry's coords.
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); 
}