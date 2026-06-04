import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function RenameObjectModal({
  visible,
  item,
  name,
  onChangeName,
  onClose,
  onRename,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Перейменування</Text>

          <Text style={styles.inputLabel}>
            Нова назва для: {item?.name || "обʼєкта"}
          </Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={onChangeName}
            placeholder="Введіть нову назву"
            autoCapitalize="none"
          />

          <View style={styles.modalActions}>
            <Pressable style={styles.cancelModalButton} onPress={onClose}>
              <Text style={styles.cancelModalText}>Скасувати</Text>
            </Pressable>

            <Pressable style={styles.saveModalButton} onPress={onRename}>
              <Text style={styles.saveModalText}>Зберегти</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.55)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    maxHeight: "88%",
  },
  modalTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },
  inputLabel: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
    color: "#111827",
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  cancelModalButton: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelModalText: {
    color: "#111827",
    fontWeight: "800",
  },
  saveModalButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveModalText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
});