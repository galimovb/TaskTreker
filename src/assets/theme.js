import { theme } from 'antd';

const { defaultAlgorithm, defaultSeed } = theme;

const myTheme = {
    algorithm: defaultAlgorithm,
    token: {
        ...defaultSeed,
    },
    components: {
        Menu: {
            itemSelectedBg: '#e7edf6', // Фон активной вкладки
            itemSelectedColor: '#000', // Цвет текста активной вкладки
            itemWidth:'100%',
            itemMarginBlock: 8,
            itemPaddingInline:'58px',
            itemMarginInline: 0,
            itemBorderRadius:0,

        },
    },
};

export default myTheme;
