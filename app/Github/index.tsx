import { Text, View, TouchableOpacity, ScrollView, useColorScheme, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const StepCard = ({ stepNumber, title, children, isExpanded, onToggle }: {
    stepNumber: number;
    title: string;
    children: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
}) => {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return (
        <View className={`${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} rounded-2xl border mb-4 overflow-hidden`}>
            <TouchableOpacity
                onPress={onToggle}
                className="p-6 flex-row items-center"
            >
                <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-bold text-sm">{stepNumber}</Text>
                </View>
                <Text className={`flex-1 text-lg font-bold ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                    {title}
                </Text>
                <Text className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isExpanded ? '−' : '+'}
                </Text>
            </TouchableOpacity>

            {isExpanded && (
                <View className={`px-6 pb-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <View className="pt-4">
                        {children}
                    </View>
                </View>
            )}
        </View>
    );
};

const PermissionCard = ({ icon, title, description, required = false }: {
    icon: string;
    title: string;
    description: string;
    required?: boolean;
}) => {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return (
        <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-3`}>
            <View className="flex-row items-start">
                <Text className="text-2xl mr-3">{icon}</Text>
                <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                        <Text className={`font-bold text-base ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                            {title}
                        </Text>
                        {required && (
                            <View className="ml-2 bg-red-100 px-2 py-0.5 rounded-full">
                                <Text className="text-red-600 text-xs font-semibold">Required</Text>
                            </View>
                        )}
                    </View>
                    <Text className={`text-sm leading-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {description}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const WarningCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return (
        <View className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <View className="flex-row items-start">
                <Text className="text-2xl mr-3">⚠️</Text>
                <View className="flex-1">
                    <Text className="font-bold text-amber-800 text-base mb-2">{title}</Text>
                    <View className="text-amber-700">
                        {children}
                    </View>
                </View>
            </View>
        </View>
    );
};

const CodeBlock = ({ children }: { children: string }) => {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return (
        <View className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg p-4 my-3`}>
            <Text className={`font-mono text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {children}
            </Text>
        </View>
    );
};

export default function GitHubTokenGuide() {
    const [expandedStep, setExpandedStep] = useState<number | null>(1);
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    const openGitHubSettings = () => {
        Linking.openURL('https://github.com/settings/tokens');
    };

    const openGitHubDocs = () => {
        Linking.openURL('https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
    };

    const toggleStep = (step: number) => {
        setExpandedStep(expandedStep === step ? null : step);
    };

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-slate-50'}`}>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Header */}
                <View className="px-6 pt-5 pb-6">
                    <View className="flex-row items-center mb-4">
                        <View className="w-12 h-12 bg-gray-800 rounded-2xl items-center justify-center mr-4">
                            <Image
                                source={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
                                className="w-6 h-6"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className={`text-2xl font-black ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                                GitHub Token Setup
                            </Text>
                            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Monitor GitHub Actions securely
                            </Text>
                        </View>
                    </View>

                    <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <Text className="text-blue-800 font-semibold text-base mb-2">
                            🔐 Why do you need a token?
                        </Text>
                        <Text className="text-blue-700 text-sm leading-5">
                            GitHub requires authentication to access private repositories and workflow data.
                            A Personal Access Token allows our app to monitor your GitHub Actions securely.
                        </Text>
                    </View>
                </View>

                {/* Steps */}
                <View className="px-6">
                    <StepCard
                        stepNumber={1}
                        title="Navigate to GitHub Settings"
                        isExpanded={expandedStep === 1}
                        onToggle={() => toggleStep(1)}
                    >
                        <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Go to your GitHub account settings to create a new token.
                        </Text>

                        <TouchableOpacity
                            onPress={openGitHubSettings}
                            className="bg-gray-800 rounded-xl p-4 flex-row items-center"
                        >
                            <Image
                                source={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
                                className="w-6 h-6 mr-3"
                            />
                            <View className="flex-1">
                                <Text className="text-white font-semibold text-base">Open GitHub Token Settings</Text>
                                <Text className="text-gray-300 text-sm">github.com/settings/tokens</Text>
                            </View>
                            <Text className="text-white text-xl">→</Text>
                        </TouchableOpacity>

                        <Text className={`text-sm mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Or manually navigate to: Settings → Developer settings → Personal access tokens → Tokens (classic)
                        </Text>
                    </StepCard>

                    <StepCard
                        stepNumber={2}
                        title="Create New Token"
                        isExpanded={expandedStep === 2}
                        onToggle={() => toggleStep(2)}
                    >
                        <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Click "Generate new token" and choose "Generate new token (classic)" for broad compatibility.
                        </Text>

                        <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4`}>
                            <Text className={`font-semibold mb-2 ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                                📝 Token Configuration:
                            </Text>
                            <Text className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • <Text className="font-semibold">Note:</Text> "DevFlow GitHub Actions Monitor"
                            </Text>
                            <Text className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • <Text className="font-semibold">Expiration:</Text> 90 days (recommended)
                            </Text>
                            <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • <Text className="font-semibold">Description:</Text> Read-only access for monitoring workflows
                            </Text>
                        </View>
                    </StepCard>

                    <StepCard
                        stepNumber={3}
                        title="Select Required Permissions"
                        isExpanded={expandedStep === 3}
                        onToggle={() => toggleStep(3)}
                    >
                        <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Select only the minimum permissions needed for monitoring GitHub Actions:
                        </Text>

                        <PermissionCard
                            icon="✅"
                            title="actions:read"
                            description="View GitHub Actions workflow runs, jobs, and logs. Essential for monitoring build status."
                            required={true}
                        />

                        <PermissionCard
                            icon="📚"
                            title="repo"
                            description="Access repository information and metadata. Needed to list repositories and their workflows."
                            required={true}
                        />

                        <PermissionCard
                            icon="👤"
                            title="read:user"
                            description="Read basic user profile information. Used to verify token ownership."
                            required={true}
                        />

                        <PermissionCard
                            icon="🏢"
                            title="read:org"
                            description="Read organization membership and repository access. Only needed if you want to monitor organization repositories."
                        />

                        <WarningCard title="Important Security Notes">
                            <Text className="text-amber-700 text-sm mb-2">
                                • Never select write permissions for monitoring-only access
                            </Text>
                            <Text className="text-amber-700 text-sm mb-2">
                                • Avoid admin:* or delete:* permissions
                            </Text>
                            <Text className="text-amber-700 text-sm">
                                • These permissions are read-only and cannot modify your repositories
                            </Text>
                        </WarningCard>
                    </StepCard>

                    <StepCard
                        stepNumber={4}
                        title="Organization Access"
                        isExpanded={expandedStep === 4}
                        onToggle={() => toggleStep(4)}
                    >
                        <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            If you belong to organizations, here's what you need to know:
                        </Text>

                        <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                            <Text className="text-green-800 font-semibold text-base mb-2">
                                ✨ Organization Repository Access
                            </Text>
                            <Text className="text-green-700 text-sm leading-5">
                                Yes! Your token can access organization repositories if you have the right permissions.
                            </Text>
                        </View>

                        <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
                            <Text className={`font-semibold mb-3 ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                                🏢 What the token can access in organizations:
                            </Text>

                            <Text className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                ✅ <Text className="font-semibold">Public repositories:</Text> Always accessible
                            </Text>
                            <Text className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                ✅ <Text className="font-semibold">Private repositories:</Text> Only if you're a member with access
                            </Text>
                            <Text className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                ✅ <Text className="font-semibold">GitHub Actions:</Text> Workflow runs, jobs, and logs you can normally see
                            </Text>
                            <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                ✅ <Text className="font-semibold">Organization info:</Text> Basic org details (if read:org is selected)
                            </Text>
                        </View>

                        <WarningCard title="Organization Token Approval">
                            <Text className="text-amber-700 text-sm mb-2">
                                Some organizations require admin approval for personal access tokens.
                            </Text>
                            <Text className="text-amber-700 text-sm mb-2">
                                If your organization has SSO enabled, you may need to authorize the token after creation.
                            </Text>
                            <Text className="text-amber-700 text-sm">
                                Check with your organization admin if you can't see expected repositories.
                            </Text>
                        </WarningCard>
                    </StepCard>

                    <StepCard
                        stepNumber={5}
                        title="Generate and Copy Token"
                        isExpanded={expandedStep === 5}
                        onToggle={() => toggleStep(5)}
                    >
                        <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            After selecting permissions, generate your token and copy it immediately.
                        </Text>

                        <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                            <Text className="text-red-800 font-semibold text-base mb-2">
                                🚨 Critical: Save Your Token Now!
                            </Text>
                            <Text className="text-red-700 text-sm leading-5">
                                GitHub will only show the token once. Copy it immediately and store it securely.
                                If you lose it, you'll need to generate a new one.
                            </Text>
                        </View>

                        <Text className={`text-base mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Your token will look like this:
                        </Text>

                        <CodeBlock>ghp_1234567890abcdefghijklmnopqrstuvwxyz</CodeBlock>

                        <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4`}>
                            <Text className={`font-semibold mb-2 ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                                🔒 Token Security Best Practices:
                            </Text>
                            <Text className={`text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • Store it in a password manager
                            </Text>
                            <Text className={`text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • Never share it or commit it to code
                            </Text>
                            <Text className={`text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • Rotate it every 90 days
                            </Text>
                            <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • Revoke it if you suspect it's compromised
                            </Text>
                        </View>
                    </StepCard>

                    <StepCard
                        stepNumber={6}
                        title="Test Your Token"
                        isExpanded={expandedStep === 6}
                        onToggle={() => toggleStep(6)}
                    >
                        <Text className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Before using the token in our app, you can test it manually:
                        </Text>

                        <Text className={`text-base mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Open your browser's developer console and run:
                        </Text>

                        <CodeBlock>{`fetch('https://api.github.com/user', {
  headers: {
    'Authorization': 'token YOUR_TOKEN_HERE'
  }
}).then(r => r.json()).then(console.log)`}</CodeBlock>

                        <Text className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            This should return your user information if the token is valid.
                        </Text>

                        <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <Text className="text-blue-800 font-semibold text-base mb-2">
                                🎉 Ready to Connect!
                            </Text>
                            <Text className="text-blue-700 text-sm leading-5">
                                Once you've generated your token, return to the integration page and paste it in the token field.
                                We'll validate it and start monitoring your GitHub Actions immediately.
                            </Text>
                        </View>
                    </StepCard>
                </View>

                {/* Footer */}
                <View className="px-6 pt-8">
                    <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                        <Text className={`font-semibold text-lg mb-3 ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                            Need Help?
                        </Text>

                        <TouchableOpacity
                            onPress={openGitHubDocs}
                            className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-lg"
                        >
                            <Text className="text-2xl mr-3">📚</Text>
                            <View className="flex-1">
                                <Text className="font-semibold text-gray-900">GitHub Documentation</Text>
                                <Text className="text-gray-600 text-sm">Official token creation guide</Text>
                            </View>
                            <Text className="text-gray-400 text-xl">→</Text>
                        </TouchableOpacity>

                        <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            If you encounter issues, check that your token has the correct permissions and hasn't expired.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
