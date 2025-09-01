import { Text, View, TouchableOpacity, Image, ScrollView, useColorScheme } from "react-native";
import { useAppStore } from "@/store/useAppStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const GitHubIcon = () => (
  <Image
    source={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
    style={{ width: 48, height: 48, borderRadius: 24 }}
  />
);

const EASIcon = () => (
  <Image
    source={require("@/assets/images/png/sdk.png")}
    style={{ width: 48, height: 48, borderRadius: 24 }}
  />
);

const JenkinsIcon = () => (
  <View style={{
    width: 48,
    height: 48,
    borderRadius: 24
  }}>
    <Image
      source={{ uri: 'https://www.jenkins.io/images/logos/jenkins/jenkins.png' }}
      style={{ width: "100%", height: "100%", resizeMode: "contain" }}
    />
  </View>
);

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  onPress: () => void;
  comingSoon?: boolean;
}

const IntegrationCard = ({
  title,
  description,
  icon,
  isConnected,
  onPress,
  comingSoon = false
}: IntegrationCardProps) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={comingSoon}
      className={`rounded-xl p-6 mb-4 shadow-sm border ${comingSoon ? 'opacity-50' : ''
        }`}
      style={{
        backgroundColor: isDark ? "#1f2937" : "white", // gray-800 for dark, white for light
        borderColor: isDark ? "#374151" : "#f3f4f6"   // gray-700 vs gray-100
      }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          {icon}
          <View className="ml-4 flex-1">
            <View className="flex-row items-center">
              <Text
                className="text-lg font-semibold"
                style={{ color: isDark ? "#f9fafb" : "#111827" }}
              >
                {title}
              </Text>
              {comingSoon && (
                <View className="ml-2 rounded px-2 py-1" style={{ backgroundColor: isDark ? "#374151" : "#f3f4f6" }}>
                  <Text style={{ color: isDark ? "#d1d5db" : "#4b5563", fontSize: 12 }}>Coming Soon</Text>
                </View>
              )}
            </View>
            <Text
              className="mt-1 text-sm leading-5"
              style={{ color: isDark ? "#9ca3af" : "#4b5563" }}
            >
              {description}
            </Text>
          </View>
        </View>
        <View className="ml-4">
          {isConnected ? (
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#d1fae5" }}>
              <Text style={{ color: "#065f46", fontSize: 12, fontWeight: "500" }}>Connected</Text>
            </View>
          ) : !comingSoon ? (
            <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#dbeafe" }}>
              <Text style={{ color: "#1e40af", fontSize: 12, fontWeight: "500" }}>Connect</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Index() {
  const { userName } = useAppStore();
  const [integrations, setIntegrations] = useState({
    github: false,
    eas: false,
    jenkins: false,
  });

  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const handleGitHubIntegration = () => {
    console.log('Setting up GitHub integration...');
    setIntegrations(prev => ({ ...prev, github: !prev.github }));
  };

  const handleEASIntegration = () => {
    console.log('Setting up EAS integration...');
    setIntegrations(prev => ({ ...prev, eas: !prev.eas }));
  };


  const handleJenkinsIntegration = () => {
    console.log('Setting up Jenkins integration...');
  };

  const connectedCount = Object.values(integrations).filter(Boolean).length;
  const hasAnyIntegrations = connectedCount > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? "#111827" : "#f9fafb" }}>
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text
            className="text-2xl font-bold"
            style={{ color: isDark ? "#f9fafb" : "#111827" }}
          >
            Welcome back, {userName || 'Developer'}! 👋
          </Text>
          <Text style={{ color: isDark ? "#9ca3af" : "#4b5563", marginTop: 8 }}>
            {hasAnyIntegrations
              ? `You have ${connectedCount} service${connectedCount > 1 ? 's' : ''} connected`
              : 'Connect your development services to get started'
            }
          </Text>
        </View>

        {/* Integration Cards */}
        <View className="px-6">
          <Text
            className="text-lg font-semibold mb-4"
            style={{ color: isDark ? "#f9fafb" : "#111827" }}
          >
            Available Integrations
          </Text>

          <IntegrationCard
            title="GitHub Actions"
            description="Monitor workflow runs, job logs, and build statuses across your repositories"
            icon={<GitHubIcon />}
            isConnected={integrations.github}
            onPress={handleGitHubIntegration}
          />

          <IntegrationCard
            title="Expo EAS Build"
            description="Track iOS and Android builds, view build logs, and get notified when complete"
            icon={<EASIcon />}
            isConnected={integrations.eas}
            onPress={handleEASIntegration}
            comingSoon={true}
          />

          <IntegrationCard
            title="Jenkins"
            description="Connect to Jenkins pipelines and monitor job results and failures"
            icon={<JenkinsIcon />}
            isConnected={integrations?.jenkins}
            onPress={handleJenkinsIntegration}
            comingSoon={true}
          />
        </View>

        {/* Quick Stats */}
        {hasAnyIntegrations && (
          <View className="px-6 mt-8">
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: isDark ? "#f9fafb" : "#111827" }}
            >
              Quick Overview
            </Text>
            <View
              className="rounded-xl p-6 shadow-sm border"
              style={{ backgroundColor: isDark ? "#1f2937" : "white", borderColor: isDark ? "#374151" : "#f3f4f6" }}
            >
              <View className="flex-row justify-between items-center">
                <View className="items-center">
                  <Text className="text-2xl font-bold" style={{ color: "#2563eb" }}>0</Text>
                  <Text style={{ color: isDark ? "#9ca3af" : "#4b5563", fontSize: 14 }}>Active Builds</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold" style={{ color: "#16a34a" }}>0</Text>
                  <Text style={{ color: isDark ? "#9ca3af" : "#4b5563", fontSize: 14 }}>Successful</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold" style={{ color: "#dc2626" }}>0</Text>
                  <Text style={{ color: isDark ? "#9ca3af" : "#4b5563", fontSize: 14 }}>Failed</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Get Started Help */}
        {!hasAnyIntegrations && (
          <View className="px-6 mt-8 mb-8">
            <View
              className="rounded-xl p-6 border"
              style={{ backgroundColor: isDark ? "#1e3a8a" : "#eff6ff", borderColor: isDark ? "#1e40af" : "#dbeafe" }}
            >
              <Text
                className="font-semibold text-lg mb-2"
                style={{ color: isDark ? "#f9fafb" : "#1e3a8a" }}
              >
                🚀 Get Started
              </Text>
              <Text style={{ color: isDark ? "#dbeafe" : "#1e40af", lineHeight: 20 }}>
                Connect at least one service above to start monitoring your CI/CD pipelines.
                You'll receive real-time notifications about build statuses, failures, and successes.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
