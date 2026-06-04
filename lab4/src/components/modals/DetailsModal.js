import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DetailRow from "../DetailRow";
import { formatBytes, formatDate, getFileType } from "../../utils/fileUtils";

export default function DetailsModal({ visible, item, onClose }) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Детальна інформація</Text>

          <ScrollView style={styles.detailsBox}>
            <DetailRow label="Назва" value={item?.name || "—"} />

            <DetailRow
              label="Тип"
              value={item ? getFileType(item.name, item.isDirectory) : "—"}
            />

            <DetailRow
              label="Розмір"
              value={item?.isDirectory ? "—" : formatBytes(item?.size)}
            />

            <DetailRow
              label="Остання модифікація"
              value={formatDate(item?.modificationTime)}
            />

            <DetailRow label="URI" value={item?.uri || "—"} />
          </ScrollView>

          <Pressable style={styles.saveModalButton} onPress={onClose}>
            <Text style={styles.saveModalText}>Закрити</Text>
          </Pressable>
        </View>
      </View>
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
  detailsBox: {
    maxHeight: 330,
    marginBottom: 14,
  },
  saveModalButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  saveModalText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
});