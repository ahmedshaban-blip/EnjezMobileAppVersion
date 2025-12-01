import React from "react";
import { Portal, Dialog, TextInput, HelperText, Button } from "react-native-paper";

export default function ChangePasswordDialog({
    visible,
    onDismiss,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    passwordError,
    handleChangePassword,
    passwordLoading,
}) {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Change Password</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry
                        mode="outlined"
                        style={{ marginBottom: 10 }}
                    />
                    <TextInput
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        mode="outlined"
                    />
                    {passwordError ? (
                        <HelperText type="error">{passwordError}</HelperText>
                    ) : null}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button
                        onPress={handleChangePassword}
                        loading={passwordLoading}
                        disabled={passwordLoading}
                    >
                        Update
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
