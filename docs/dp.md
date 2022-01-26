---
categories:
  - 算法
titleSlug: dp
title: 动态规划 DP
series: 算法
thumbnail: ''
description: 暂无
wip: true
top: false
---
# 动态规划 - DP



## 解题步骤

例题: 

有2, 5, 7面值的三种硬币, 求需要凑到27的最小硬币数量.

1. 确定状态

最后一步: 因为动态规划基本上就是求最优策略, 那么最优策略的最后一步所需要的条件则称为最优策略

比如题目中, 一共凑到27的所需硬币数量为k, 那么最后一枚硬币我们称它为a~k~, 所以, 我们前面所需要的硬币面值之和应为 27 - a~k~

<img src="https://s2.loli.net/2021/12/06/qCadcYNjKX3fr78.png" alt="image-20211206194203755" style="zoom: 50%;" />

子问题: 上面我们将**最少用几枚硬币凑到27**转化为了一个子问题: **最少用几枚硬币凑到27-k**

2. 转移方程: 因为问题与子问题都是`最少用几枚硬币凑到x`, 所以我们可以确定状态方程`f(x) = 最少用几枚硬币凑到x`

转移方程的意义为: 将一个复杂问题转换为已知问题进行解答





假设最后一枚硬币是2, 那么状态方程为 f(27-2) + 1

假设最后一枚硬币是5, 那么状态方程为 f(27-5) + 1

假设最后一枚硬币是7, 那么状态方程为 f(27-7) + 1



因为情况只有以上三种, 我们又是求最优解, 所以结果

f(27) = min{f(27-2) + 1, f(27-5) + 1, f(27-7) + 1}

3. 初始条件和边界情况

   f(0) = 0, 如果不能拼出对应f(y), 那么设f(y) 为正无穷

4. 计算顺序

   f(0), f(1), .....





## 例题



### [5. 最长回文子串 - 力扣（LeetCode)](https://leetcode-cn.com/problems/longest-palindromic-substring/)

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

示例: 

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```



```java
public String longestPalindrome(String s) {
    int len = s.length();
    if (len < 2) {
        return s;
    }

    int maxLen = 1;
    int begin = 0;
    // dp[i][j] 表示 s[i..j] 是否是回文串
    boolean[][] dp = new boolean[len][len];
    // 初始化：所有长度为 1 的子串都是回文串
    for (int i = 0; i < len; i++) {
        dp[i][i] = true;
    }

    char[] charArray = s.toCharArray();
    // 递推开始
    // 先枚举子串长度
    for (int L = 2; L <= len; L++) {
        // 枚举左边界，左边界的上限设置可以宽松一些
        for (int i = 0; i < len; i++) {
            // 由 L 和 i 可以确定右边界，即 j - i + 1 = L 得
            int j = L + i - 1;
            // 如果右边界越界，就可以退出当前循环
            if (j >= len) {
                break;
            }

            if (charArray[i] != charArray[j]) {
                dp[i][j] = false;
            } else {
                if (j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }

            // 只要 dp[i][L] == true 成立，就表示子串 s[i..L] 是回文，此时记录回文长度和起始位置
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                begin = i;
            }
        }
    }
    return s.substring(begin, begin + maxLen);
}
```
