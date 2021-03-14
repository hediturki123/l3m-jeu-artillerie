Dans ce dernier TP/mini projet, vous devrez coder un petit jeu d’artillerie spatiale en 2D. Nous vous fournissons un squelette qui implémente notamment le service de gestion des tirs ainsi que les structures de données relatives à la représentation des cartes de jeu.

# Principe :
Le jeu prend place sur une carte sur laquelle sont placées des planètes. 
Une partie se joue sur une carte, avec plusieurs joueurs. Chaque joueur dispose d’une ou plusieurs bases. 
Le jeu se joue tour par tour. Durant un tour de jeu, les joueurs spécifient un angle et une force de tir pour chaque base. Une fois que c’est fait, les joueurs peuvent terminer le tour, toutes les bases tirent en même temps. Les tirs peuvent entrer en collision avec une planète ou une autre base, dans ce dernier cas la base impactée est détruite et retirée du jeu.
Le jeu se termine quand il ne reste plus de bases (partie nulle) ou seulement des bases d’un même joueur (dans ce cas c’est le vainqueur).

# Amorce sur GitHub
Faites un fork du projet pour avoir le votre en propre.  
Clonez le projet ainsi forké

# Etapes à faire :
1. Représenter une carte de jeu : planètes et bases
	a. Utilisation de balises SVG pour dessiner la carte
Balise svg : https://developer.mozilla.org/fr/docs/Web/SVG/Element/svg
Balise cercle : https://developer.mozilla.org/fr/docs/Web/SVG/Element/circle
Balise groupe : https://developer.mozilla.org/fr/docs/Web/SVG/Element/g
		b. Navigation dans la carte avec les directives dédiées :
Directives  appSvgDraggable  et  appSvgZoomable
Evénement  svgDragEnd
2. Permettre de tirer et de commencer un nouveau tour
		a. Utilisation de balises SVG polyline : https://developer.mozilla.org/fr/docs/Web/SVG/Element/polyline
3. Pouvoir spécifier un angle et une force pour une base
4. Ajouter un mode édition
		a. Ajout / Suppression / Modification de planètes
		b. Ajout / Suppression de bases
Ajout / Suppression de joueurs
