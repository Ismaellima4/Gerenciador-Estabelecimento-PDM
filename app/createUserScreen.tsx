import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { router } from "expo-router";
import { registerStyles } from "@/styles/registerStyles";
import FormActionButtons from "@/components/FormActionButton";
import { UserRole, UserRoleTranslations } from "@/types/enum/roles.enum";
import { createUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function UserRegistration() {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.Admin_Stock);
  const [showRoles, setShowRoles] = useState(false);

  const handleSave = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Usuário e senha são obrigatórios.");
      return;
    }
    try {
      const newUser = { username, password, role };
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      dispatch(createUser(newUser)).unwrap();
      router.back();
    } catch {
      Alert.alert("Error", "Error ao tentar salvar o usuário!");
    }
  };

  return (
    <SafeAreaView style={registerStyles.safeArea}>
      <ScrollView>
        <View style={registerStyles.container}>
          <View style={registerStyles.inputsWrapper}>
            <Text style={registerStyles.label}>
              Usuário <Text style={registerStyles.required}>*</Text>
            </Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Nome de usuário"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#888"
              autoCapitalize="none"
            />

            <Text style={registerStyles.label}>
              Senha <Text style={registerStyles.required}>*</Text>
            </Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#888"
              secureTextEntry
            />

            <Text style={registerStyles.label}>Função</Text>
            <TouchableOpacity
              style={registerStyles.input}
              onPress={() => setShowRoles(!showRoles)}
            >
              <Text style={{ color: "#333" }}>{UserRoleTranslations[role]}</Text>
            </TouchableOpacity>

            {showRoles && (
              <View style={styles.roleList}>
                {Object.values(UserRole).map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={styles.roleItem}
                    onPress={() => {
                      setRole(r as UserRole);
                      setShowRoles(false);
                    }}
                  >
                    <Text style={styles.roleText}>{UserRoleTranslations[r]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <FormActionButtons onSave={handleSave} onCancel={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  roleList: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
    marginBottom: 15,
  },
  roleItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  roleText: {
    fontSize: 16,
    color: '#333',
  },
});
