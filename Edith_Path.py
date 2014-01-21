# -*-coding:utf-8 -*

""" Edith Path by punkka

	On crée une fenêtre simple qui permet d'ajouter un dossier au path global.
"""

# On importe Qt
from PySide import QtGui
from PySide.QtCore import Qt, QFile
import sys as systeme, winreg, os


class MainWindow(QtGui.QWidget):
	"""TODO """

	def __init__(self, pathManager):
		"""TODO """		
		self.pathManager = pathManager

		QtGui.QWidget.__init__(self, None)
		
		self.resize(400, 350)
		self.setWindowTitle('Edith Path')
		self.setProperty("class", "main_window");
	
	def buildInterface(self):
		"""TODO """

		### Affichage de la variable PATH actuelle ###
		ActuelPATH = self.pathManager.getPATH().split(";")

		labelPlainPATH = QtGui.QLabel("PATH actuel :")
		labelPlainPATH.setFixedSize(280,20)

		plainPATH = QtGui.QPlainTextEdit("\n".join(ActuelPATH))
		plainPATH.setFixedSize(380,200)
		plainPATH.verticalScrollBar().setValue(plainPATH.verticalScrollBar().maximum());
		plainPATH.setReadOnly(True)
		plainPATH.setLineWrapMode(QtGui.QPlainTextEdit.NoWrap)

		### Affichage du formulaire de choix du chemin à ajouter au PATH ###
		labelChoixDossier = QtGui.QLabel("Choississez un dossier à ajouter au path :")
		labelChoixDossier.setFixedSize(280,20)

		boutonChoixDossier = QtGui.QPushButton("Parcourir")
		boutonChoixDossier.setFixedSize(90,25)

		cheminChoixDossier = QtGui.QLineEdit()
		cheminChoixDossier.setFixedSize(290,25)
		# cheminChoixDossier.setReadOnly(True)

		layoutChoixDossier = QtGui.QHBoxLayout()
		layoutChoixDossier.addWidget(boutonChoixDossier)
		layoutChoixDossier.addWidget(cheminChoixDossier)

		### Affichage du bouton "Valider" ###
		boutonValiderDossier = QtGui.QPushButton("Valider")
		boutonValiderDossier.setFixedSize(90,25)

		layoutBoutonValider = QtGui.QHBoxLayout()
		layoutBoutonValider.addWidget(boutonValiderDossier)

		### Création du layout principal ###
		layoutMain = QtGui.QVBoxLayout()
		layoutMain.addWidget(labelPlainPATH)
		layoutMain.addWidget(plainPATH)
		layoutMain.addWidget(labelChoixDossier)
		layoutMain.addLayout(layoutChoixDossier)
		layoutMain.addLayout(layoutBoutonValider)

		self.setLayout(layoutMain)

		####
		# Initialisation des signaux
		####
		boutonChoixDossier.clicked.connect(lambda : self.ouvrirDossierDialogue(cheminChoixDossier))
		boutonValiderDossier.clicked.connect(lambda : self.ajouterCheminPATH(cheminChoixDossier))
		

	def setCustomStyleSheet(self, path):
		""" Application de la feuille de style aux éléments de l'interface. """

		try:
			with open(path, 'r') as qssFile:
				styleSheet = qssFile.read()
				self.setStyleSheet(styleSheet)
				return self
		except:
			print("Le fichier", path, "n'a pas été trouvé.")
			return self


	####
	# Définition des slots
	####
	def ouvrirDossierDialogue(self, lineEdit):
		""" SLOT : Ouverture de la fenêtre de dialogue de choix d'un dossier """

		dossier = QtGui.QFileDialog.getExistingDirectory()
		lineEdit.setText(dossier)

	def ajouterCheminPATH(self, lineEdit):
		chemin = lineEdit.text()
		if os.path.exists(chemin):
			print(chemin)
			# self.pathManager.addElementToPATH(chemin)
			
			return None
		else:
			return None


class PathManager:

	def __init__(self):
		chemin_cle_registre = r"SYSTEM\CurrentControlSet\Control\Session Manager\Environment"
		self.PATH = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, chemin_cle_registre, 0, winreg.KEY_ALL_ACCESS)	

	def getPATH(self):
		return winreg.QueryValueEx(self.PATH, 'Path')[0]

	def addElementToPATH(self, element):
		oldPath = winreg.QueryValueEx(self.PATH, 'Path')[0]
		newPath = element + ';' + oldPath
		return newPath
		# winreg.SetValueEx(self.PATH, 'Path', 0, newPath)			
		return None



# Définition de la fonction "main".
if __name__ == "__main__":
	
	pathManager = PathManager()	

	if(len(systeme.argv) == 1):
		app = QtGui.QApplication(systeme.argv)
		
		fenetre_principale = MainWindow(pathManager)
		fenetre_principale.buildInterface()		
		fenetre_principale.setCustomStyleSheet("style.qss");

		fenetre_principale.show()

		systeme.exit(app.exec_())
	else:
		print("mode sans gui")
		os.system("pause")
