varying vec3 vertexNormal;

void main()
{
  // pow(0.65) is intensity value
  // intensity = its power minus the dot product of the vertex Normal's full transparency times a magic number that produces a fadeaway effect.
  float intensity = pow(0.4 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0); 
  gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity; //r,g,b,alpha values for blue atmosphere effect.
}