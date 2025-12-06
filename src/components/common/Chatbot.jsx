import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  Dimensions,
} from "react-native";
import {
  Text,
  TextInput,
  FAB,
  Modal,
  Portal,
  IconButton,
  useTheme,
  Avatar,
  Surface,
  Chip,
} from "react-native-paper";
import { X, Send, Sparkles, Bot, User } from "lucide-react-native";
import { queryAI, checkAndInitializeChatbot } from "../../utils/aiService";

// --- Sub-components ---

// 1. Message Bubble with Avatar
const ChatMessage = ({ m }) => {
  const theme = useTheme();
  const isUser = m.role === "user";

  return (
    <View
      style={[
        styles.messageRow,
        { flexDirection: isUser ? "row-reverse" : "row" },
      ]}
    >
      {/* Avatar */}
      <View style={[styles.avatarContainer, { backgroundColor: isUser ? theme.colors.primaryContainer : theme.colors.secondaryContainer }]}>
        {isUser ? (
          <User size={18} color={theme.colors.onPrimaryContainer} />
        ) : (
          <Bot size={18} color={theme.colors.onSecondaryContainer} />
        )}
      </View>

      {/* Bubble */}
      <Surface
        elevation={0}
        style={[
          styles.messageBubble,
          {
            backgroundColor: isUser ? theme.colors.primary : theme.colors.surfaceVariant,
            borderBottomRightRadius: isUser ? 4 : 20,
            borderBottomLeftRadius: isUser ? 20 : 4,
          },
        ]}
      >
        <Text
          variant="bodyMedium"
          style={{ color: isUser ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }}
        >
          {m.text}
        </Text>
      </Surface>
    </View>
  );
};

// 2. Typing Indicator Bubble
const TypingIndicator = () => {
  const theme = useTheme();
  return (
    <View style={styles.messageRow}>
      <View style={[styles.avatarContainer, { backgroundColor: theme.colors.secondaryContainer }]}>
        <Bot size={18} color={theme.colors.onSecondaryContainer} />
      </View>
      <View style={[styles.typingBubble, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, fontStyle: 'italic' }}>
          Thinking...
        </Text>
      </View>
    </View>
  );
};

// --- Main Component ---

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef(null);
  const theme = useTheme();
  const screenHeight = Dimensions.get("window").height;

  // Suggested prompts for empty state
  const suggestions = ["Summarize Services in this app", "What is Enjez?", "Help me book a service", "How to contact support?"];

  useEffect(() => {
    const initBot = async () => {
      const result = await checkAndInitializeChatbot();
      if (result && result.status === "processed") {
        console.log("Chatbot initialized.");
      }
    };
    initBot();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, loading]);

  const sendMessage = async (textOverride) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    Keyboard.dismiss();
    setMessages((m) => [...m, { role: "user", text: textToSend.trim() }]);
    setInput("");
    setLoading(true);

    try {
      const data = await queryAI(textToSend.trim(), 3);
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.answer || "I couldn't find an accurate answer." },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Sorry, I'm having trouble connecting right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => setOpen(false)}
        contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.background, height: screenHeight * 0.85 }]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          {/* 1. Header */}
          <Surface elevation={1} style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryContainer }]}>
                <Sparkles size={20} color={theme.colors.primary} />
              </View>
              <View>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Enjez AI</Text>
                <Text variant="labelSmall" style={{ color: theme.colors.outline }}>Always here to help</Text>
              </View>
            </View>
            <IconButton
              icon={() => <X size={24} color={theme.colors.onSurface} />}
              onPress={() => setOpen(false)}
              size={20}
            />
          </Surface>

          {/* 2. Chat Area */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 ? (
              <View style={styles.emptyState}>
                <Avatar.Icon
                  size={80}
                  icon={() => <Bot size={40} color={theme.colors.primary} />}
                  style={{ backgroundColor: theme.colors.primaryContainer, marginBottom: 16 }}
                />
                <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>
                  Hello there!
                </Text>
                <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant, maxWidth: '80%', marginBottom: 24 }}>
                  I'm Enjez AI, your virtual assistant. How can I help you today?
                </Text>

                {/* Suggestions Chips */}
                <View style={styles.chipContainer}>
                  {suggestions.map((s, i) => (
                    <Chip
                      key={i}
                      onPress={() => sendMessage(s)}
                      style={styles.chip}
                      textStyle={{ fontSize: 12 }}
                      icon={() => <Sparkles size={14} color={theme.colors.primary} />}
                    >
                      {s}
                    </Chip>
                  ))}
                </View>
              </View>
            ) : (
              <>
                {messages.map((m, i) => (
                  <ChatMessage key={i} m={m} />
                ))}
                {loading && <TypingIndicator />}
              </>
            )}
          </ScrollView>

          {/* 3. Input Footer */}
          <Surface elevation={4} style={[styles.inputWrapper, { backgroundColor: theme.colors.surface }]}>
            <TextInput
              mode="outlined"
              value={input}
              onChangeText={setInput}
              placeholder="Ask me anything..."
              placeholderTextColor={theme.colors.outline}
              style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
              outlineStyle={{ borderRadius: 24, borderColor: theme.colors.outlineVariant }}
              contentStyle={{ paddingHorizontal: 16 }}
              dense
              returnKeyType="send"
              onSubmitEditing={() => sendMessage()}
              right={
                <TextInput.Icon
                  icon={() => <Send size={20} color={!input.trim() ? theme.colors.outline : theme.colors.primary} />}
                  onPress={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  forceTextInputFocus={false}
                />
              }
            />
          </Surface>
        </KeyboardAvoidingView>
      </Modal>

      {/* Floating Action Button */}
      {!open && (
        <FAB
          icon={() => <Bot size={24} color={theme.colors.onPrimaryContainer} />}
          label="Chat AI"
          style={[styles.fab, { backgroundColor: theme.colors.primaryContainer }]}
          color={theme.colors.onPrimaryContainer}
          onPress={() => setOpen(true)}
          uppercase={false}
        />
      )}
    </Portal>
  );
}

const styles = StyleSheet.create({
  // Modal & Layout
  modalContent: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    elevation: 4,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll Area
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Messages
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
    alignItems: "flex-end",
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    maxWidth: "80%",
  },
  typingBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  chip: {
    borderRadius: 16,
  },

  // Input
  inputWrapper: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  textInput: {
    fontSize: 15,
  },
});