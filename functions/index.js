const functions = require('firebase-functions');

exports.getConfig = functions.https.onCall((data, context) => {
  // Vérification de l'authentification si nécessaire
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  // }

  const configs = functions.config();
  
  // Retourne uniquement les variables autorisées
  switch(data.variable) {
    case 'youtube_api_key':
      return configs.youtube.api_key;
    default:
      throw new functions.https.HttpsError('invalid-argument', 'Variable non autorisée');
  }
});
