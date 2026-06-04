import { StatusBar, StyleSheet, View } from "react-native";

import Header from "./src/components/Header";
import MemoryStats from "./src/components/MemoryStats";
import ActionBar from "./src/components/ActionBar";
import PathBar from "./src/components/PathBar";
import FileList from "./src/components/FileList";

import CreateObjectModal from "./src/components/modals/CreateObjectModal";
import RenameObjectModal from "./src/components/modals/RenameObjectModal";
import FileEditorModal from "./src/components/modals/FileEditorModal";
import DetailsModal from "./src/components/modals/DetailsModal";

import { useFileManager } from "./src/hooks/useFileManager";

export default function App() {
  const manager = useFileManager();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      <Header />

      <MemoryStats memory={manager.memory} />

      <ActionBar
        onCreateFolder={() => manager.openCreateModal("folder")}
        onCreateFile={() => manager.openCreateModal("file")}
        onRefresh={manager.refreshCurrentDirectory}
      />

      <PathBar
        currentDir={manager.currentDir}
        canGoUp={manager.canGoUp}
        onGoUp={manager.goUp}
      />

      <FileList
        entries={manager.entries}
        loading={manager.loading}
        onRefresh={manager.refreshCurrentDirectory}
        onOpen={manager.openEntry}
        onDetails={manager.openDetails}
        onRename={manager.openRenameModal}
        onDelete={manager.confirmDelete}
      />

      <CreateObjectModal
        visible={manager.createModalVisible}
        mode={manager.createMode}
        name={manager.newName}
        content={manager.newFileContent}
        onChangeName={manager.setNewName}
        onChangeContent={manager.setNewFileContent}
        onClose={manager.closeCreateModal}
        onCreate={manager.createObject}
      />

      <RenameObjectModal
        visible={manager.renameModalVisible}
        item={manager.renameItem}
        name={manager.renameName}
        onChangeName={manager.setRenameName}
        onClose={manager.closeRenameModal}
        onRename={manager.renameSelectedObject}
      />

      <FileEditorModal
        visible={manager.editorVisible}
        fileName={manager.openedFile?.name}
        content={manager.editorContent}
        onChangeContent={manager.setEditorContent}
        onClose={manager.closeEditor}
        onSave={manager.saveOpenedFile}
      />

      <DetailsModal
        visible={manager.detailsVisible}
        item={manager.detailsItem}
        onClose={manager.closeDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
});