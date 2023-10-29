# React Native Tutorial Notes

- Tutorial link: https://www.youtube.com/watch?v=mJ3bGvy0WAY

### Differences: React Native v.s React
- ```<Text></Text> ``` instead of ```<h></h>```
- ```<TouchableOpacity />``` instead of ```<button />```
- ```<ActivityIndicator />``` It is used for showing a spinner or loading indicator in your app
-  ```<FlatList />``` for larger lists with smooth scrolling; ```Map function``` for smaller lists
-  ```<ScrollView />``` instead of ```overflow: scroll```
-  ```<SafeAreaView />``` provides a safe zone to render your app's content without being covered by the device's hardware features like the notch, home indicator, or status bar. This ensures that your content is displayed within the visible area, making your app more accessible.

## Environment Setups
- source 1 - React Native 官方文档: https://reactnative.dev/docs/environment-setup
- source 2 - React Native Android环境搭建(Mac): https://juejin.cn/post/6844903599374368775
- source 3 - Mac下的Android开发环境搭建: https://juejin.cn/post/7125315987742097438
- JDK setup: 
  1. 检查java版本
      ``` bash
      java -version
      ```
  2. 下载jdk 1.8
  3. 配置环境
      terminal:
      ``` bash
      touch ~/.bash_profile   # 创建bash_profile
      open ~/.bash_profile    # 打开bash_profile
      ```
      ~/.bash_profile 文件中加入:
      ``` bash
      export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_202.jdk/Contents/Home
      export JAVA_11_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.11.jdk/Contents/Home
      alias jdk8='export JAVA_HOME=$JAVA_8_HOME'
      alias jdk11='export JAVA_HOME=$JAVA_11_HOME'
      ```
      回到terminal:
      ``` bash
      source ~/.bash_profile  # 当前bash环境下读取并执行~/.bash_profile 中的命令
      jdk8                    # 切换至jdk 1.8版本
      java -version           # 确认jdk版本是否切换成功
      ```
- Android Emulator Setup: https://docs.expo.dev/workflow/android-studio-emulator/
## Scripts
- 创建expo react native项目
    ``` bash
    npx create-expo-app@latest MoveMate -t
    npx expo start    # The New Expo CLI: https://blog.expo.dev/the-new-expo-cli-f4250d8e3421
    ```
- 添加 Tailwindcss https://www.nativewind.dev/quick-starts/expo
重点：
  1. TypeScript - 多加一个文件
  2. tailwindcss 用3.3.2版本
        ``` bash
        npm install nativewind
        npm install --dev tailwindcss@3.3.2     # 一定要用3.3.2
        npx tailwindcss init
        ```
  3. 使用时要加双引号（单引号不生效）
        ``` TypeScript
        <View className="mt-10"> 
        <!-- <View className='mt-10'> 不生效 -->
        ```

- 添加 React Navigation https://reactnavigation.org/docs/getting-started/
  1. Scripts
        ``` bash
        npm install @react-navigation/native
        npx expo install react-native-screens react-native-safe-area-context
        npm install @react-navigation/material-bottom-tabs react-native-paper react-native-vector-icons
        npm install @react-navigation/stack
        npx expo install react-native-gesture-handler
        npx expo install @react-native-masked-view/masked-view
        ```
  2. Add following code to ```App.tsx```
        ``` TypeScript
        import 'react-native-gesture-handler';
        ```
- 创建react native文件快捷键
    ``` TypeScript
    rnf
    ```


- 需要更改测试方式 EAS Build
1. https://docs.expo.dev/build/setup/
2. https://www.youtube.com/watch?v=3RCahcMlsBY&ab_channel=NativeNotify

3. https://docs.expo.dev/build-reference/apk/

- Issues:
  - 弹出键盘会把界面push上去
  - screen传参中的type报错
  - Google icon的样式
  - profile photo
    - ？是否出现在signup流程里
    - ？如果出现是否 skip
    - 
