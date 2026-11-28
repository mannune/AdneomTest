// Service worker : permet à l'app de fonctionner hors ligne.
// Stratégie : réseau d'abord (pour recevoir les mises à jour), cache en secours.
// Incrémenter la version du cache à chaque changement des fichiers de l'app.

const VERSION_CACHE = "batchcooking-v4";

const FICHIERS_APP = [
  "./",
  "./index.html",
  "./app.js",
  "./recipes.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (evenement) => {
  evenement.waitUntil(
    caches.open(VERSION_CACHE).then((cache) => cache.addAll(FICHIERS_APP))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evenement) => {
  evenement.waitUntil(
    caches.keys()
      .then((noms) => Promise.all(
        noms.filter((nom) => nom !== VERSION_CACHE).map((nom) => caches.delete(nom))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (evenement) => {
  const requete = evenement.request;
  if (requete.method !== "GET" || new URL(requete.url).origin !== self.location.origin) return;

  evenement.respondWith(
    fetch(requete)
      .then((reponse) => {
        const copie = reponse.clone();
        caches.open(VERSION_CACHE).then((cache) => cache.put(requete, copie));
        return reponse;
      })
      .catch(() => caches.match(requete).then((enCache) => enCache || caches.match("./index.html")))
  );
});
