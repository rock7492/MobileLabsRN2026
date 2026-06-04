import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FileEditorModal({
  visible,
  fileName,
  content,
  onChangeContent,
  onClose,
  onSave,
}) {
  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        style={styles.editorScreen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.editorHeader}>
          <View style={styles.editorTitleBlock}>
            <Text style={styles.editorTitle}>Редагування файлу</Text>
            <Text style={styles.editorFileName}>{fileName}</Text>
          </View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Закрити</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.editorInput}
          value={content}
          onChangeText={onChangeContent}
          multiline
          textAlignVertical="top"
          placeholder="Вміст файлу..."
        />

        <Pressable style={styles.saveFileButton} onPress={onSave}>
          <Text style={styles.saveFileButtonText}>Зберегти зміни</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  editorScreen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 12 : 54,
    paddingHorizontal: 14,
    paddingBottom: 18,
  },
  editorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  editorTitleBlock: {
    flex: 1,
  },
  editorTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "900",
  },
  editorFileName: {
    color: "#6B7280",
    marginTop: 3,
  },
  closeButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  closeButtonText: {
    color: "#111827",
    fontWeight: "800",
  },
  editorInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    padding: 14,
    fontSize: 15,
    color: "#111827",
    textAlignVertical: "top",
  },
  saveFileButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  saveFileButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
});