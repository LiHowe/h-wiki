# 颜色

在Web开发中我们常见的样式属性莫过于`color`以及`background-color`了， 而颜色定义的常见的表现形式有如下几种

+ `RGB`: 红(Red)、绿(Green)、蓝(Blue)三原色
+ `HSL`: 色相(Hue)、饱和度(Saturation)、亮度(Light)
+ `HEX(十六进制)`: RGB的十六进制表示

带有透明度通道(alpha)则会在颜色后面追加一个透明度通道值, 取值范围为[0, 1]

## RGB

当RGB三个数值都是最大(255)时，显示白色`rgb(255, 255, 255)`, 反之都是最小(0)时, 显示黑色

## HSL

<div>
<img style="width: 49%;" src="https://i.loli.net/2021/10/22/2xpluJ8hngCFO7K.png" alt="色彩空间"/>

<img style="width: 49%;" src="https://i.loli.net/2021/10/22/mlfvacr4yeDguP9.png" alt="色彩空间"/>
</div>

## 相互转换

可以参考[stackoverflow](https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion)

### RGB -> HSL

```javascript
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
```

### HSL -> RGB

```javascript
/**
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l){
    let r, g, b;

    if (s === 0){
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
```

### RGB -> HEX
