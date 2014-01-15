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
	
	def buildInterface(self):
		"""TODO """
		pathActuel = pathManager.getPATH().split(";")
		print("\n".join(pathActuel))

		labelChoixDossier = QtGui.QLabel("Choississez un dossier à ajouter au path :")
		labelChoixDossier.setFixedSize(280,20)

		choixDossier = QtGui.QPushButton("Parcourir")
		choixDossier.setFixedSize(85,25)


		cheminDossier = QtGui.QLineEdit()
		cheminDossier.setFixedSize(380,20)

		layout = QtGui.QVBoxLayout()
		layout.addWidget(labelChoixDossier)
		layout.addWidget(choixDossier)
		layout.addWidget(cheminDossier)

		self.setLayout(layout)

		####
		# Définitions des signaux
		####
		choixDossier.clicked.connect(lambda : self.ouvrirDossierDialogue(cheminDossier))
		

	def setCustomStyleSheet(self, path):
		"""TODO """
		with open(path, 'r') as qssFile:
			styleSheet = qssFile.read()
			self.setStyleSheet(styleSheet)

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
