# -*-coding:utf-8 -*

""" Edith Path by punkka

	On crée une fenêtre simple qui permet d'ajouter un dossier au path global.
"""

# On importe Qt
from PySide import QtGui
from PySide.QtCore import Qt, QFile
import sys as systeme, winreg, os


# Definition de la classe d'affichage de l'interface.
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
#####
# Definition de la classe d'affichage de l'interface.
#####


class PathManager:

	def __init__(self):
		chemin_cle_registre = r"SYSTEM\CurrentControlSet\Control\Session Manager\Environment"
		try:
			self.PATH = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, chemin_cle_registre, 0, winreg.KEY_ALL_ACCESS)	
		except :
			self.PATH = None

	def getPATH(self):
		if(self.PATH != None):
			return winreg.QueryValueEx(self.PATH, 'Path')[0]
		return "Le path n'a pas pu être récupéré."


	def addElementToPATH(self, element):
		oldPath = winreg.QueryValueEx(self.PATH, 'Path')[0]
		newPath = element + ';' + oldPath
		return newPath
		# winreg.SetValueEx(self.PATH, 'Path', 0, newPath)			
		return None



# Définition de la fonction "main".
if __name__ == "__main__":

	if (os.name != 'nt') :
		print("Vous ne pouvez pas utiliser ce script sur un autre os que Windows")		
		systeme.exit(os.system("pause"))


	pathManager = PathManager()	

	if(len(systeme.argv) == 1):
		app = QtGui.QApplication(systeme.argv)
		
		fenetre_principale = MainWindow(pathManager)
		fenetre_principale.buildInterface()		
		fenetre_principale.setCustomStyleSheet("style.qss");

		fenetre_principale.show()

		systeme.exit(app.exec_())
	else:
		print("Mode sans gui")	

		lengthArgv = len(systeme.argv)
		i = 1

		while i < lengthArgv :

			if os.path.exists(systeme.argv[i]):
				# PathManager.addElementToPATH(systeme.argv[i])	
				print(systeme.argv[i])
			else : 
				print("le chemin spécifié n'existe pas")
				break
			i += 1

		systeme.exit(os.system("pause"))
