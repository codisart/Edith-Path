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

		ActuelPATH = self.pathManager.getPATH().split(";")

		labelPlainPATH = QtGui.QLabel("PATH actuel :")
		labelPlainPATH.setFixedSize(280,20)

		plainPATH = QtGui.QPlainTextEdit("\n".join(ActuelPATH))
		plainPATH.setFixedSize(380,200)
		plainPATH.verticalScrollBar().setValue(plainPATH.verticalScrollBar().maximum());
		plainPATH.setReadOnly(True)
		plainPATH.setLineWrapMode(QtGui.QPlainTextEdit.NoWrap)


		labelChoixDossier = QtGui.QLabel("Choississez un dossier à ajouter au path :")
		labelChoixDossier.setFixedSize(280,20)

		choixDossier = QtGui.QPushButton("Parcourir")
		choixDossier.setFixedSize(85,25)

		cheminDossier = QtGui.QLineEdit()
		cheminDossier.setFixedSize(380,20)

		validerDossier = QtGui.QPushButton("Valider")
		validerDossier.setFixedSize(85,25)

		layoutBoutonValider = QtGui.QHBoxLayout()
		layoutBoutonValider.addWidget(validerDossier)

		layoutMain = QtGui.QVBoxLayout()
		layoutMain.addWidget(labelPlainPATH)
		layoutMain.addWidget(plainPATH)
		layoutMain.addWidget(labelChoixDossier)
		layoutMain.addWidget(choixDossier)
		layoutMain.addWidget(cheminDossier)
		layoutMain.addLayout(layoutBoutonValider)

		self.setLayout(layoutMain)

		####
		# Initialisation des signaux
		####
		choixDossier.clicked.connect(lambda : self.ouvrirDossierDialogue(cheminDossier))
		

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
	def ouvrirDossierDialogue(self,lineEdit):
		""" SLOT : Ouverture de la fenêtre de dialogue de choix d'un dossier """

		dossier = QtGui.QFileDialog.getExistingDirectory()
		lineEdit.setText(dossier)


class PathManager:

	def __init__(self):
		chemin_cle_registre = r"SYSTEM\CurrentControlSet\Control\Session Manager\Environment"
		self.PATH = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, chemin_cle_registre, 0, winreg.KEY_ALL_ACCESS)	

	def getPATH(self):
		return winreg.QueryValueEx(self.PATH, 'Path')[0]




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
