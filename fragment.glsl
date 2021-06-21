// fragment shader changes color of pixels between each vertex on the object.
// sampler2D is the default type which is provided by glsl for textures.
// in .js, we declared a section called uniforms which we called 'globeTexture' and assigned it the texture (img) we want to import to the fragment shader. 
// Then here, we assign globeTexture to texture2D function as the first argument, which will load our texture for us.
// UVs are essentially x and y coordinates for something that is 2D. texture2D() takes a second argument of vec2 (a UV) to map a 2D texture onto 3D space.
// see vertex.glsl for the definition of varying.

uniform sampler2D globeTexture; 
varying vec2 vertexUV;
varying vec3 vertexNormal;
void main()
{
  // this code provides an atmospheric effect made by the creator of three.js!
  float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

  gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
}