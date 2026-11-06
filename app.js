const storeProducts = [
    {
        title: 'طقم زيوس الشتوي الرجالي - كود 2036',
        description: 'طقم شتوي رجالي من زيوس، متوفر بألوان ومقاسات متعددة.',
        season: 'winter',
        price: 1250,
        oldPrice: 1550,
        bundle: true,
        type: 'set',
        qr: true,
        category: 'men',
        sizes: ['L', 'XL', '2XL', '3XL'],
        sizeLabel: 'اختر المقاس:',
        variants: [
            { name: 'أزرق', images: ['photo_2026-11-06_20-21-32.jpg', 'photo_2026-11-06_20-21-37.jpg', 'photo_2026-11-06_20-22-47.jpg', 'photo_2026-11-06_20-22-50.jpg'] },
            { name: 'نبيتي', images: ['photo_2026-11-06_20-22-56.jpg', 'photo_2026-11-06_20-22-59.jpg', 'photo_2026-11-06_20-23-00.jpg', 'photo_2026-11-06_20-23-01.jpg'] },
            { name: 'أسود', images: ['photo_2026-11-06_20-23-04.jpg', 'photo_2026-11-06_20-23-05.jpg', 'photo_2026-11-06_20-23-06 (2).jpg', 'photo_2026-11-06_20-23-06.jpg', 'photo_2026-11-06_20-23-07.jpg'] }
        ]
    },
    {
        title: 'طقم زيوس الشتوي الأولادي - كود 1036',
        description: 'طقم شتوي أولادي، اختر اللون والمقاس المناسب من الخيارات.',
        season: 'winter',
        price: 1000,
        bundle: true,
        type: 'set',
        qr: true,
        category: 'kids',
        sizes: ['12', '14', '16', '18'],
        sizeLabel: 'اختر المقاس (سنوات):',
        variants: [
            { name: 'نبيتي', images: ['photo_2026-11-06_20-23-09.jpg', 'photo_2026-11-06_20-23-10.jpg', 'photo_2026-11-06_20-23-11.jpg', 'photo_2026-11-06_20-23-12.jpg'] },
            { name: 'أسود', images: ['photo_2026-11-06_20-23-14.jpg', 'photo_2026-11-06_20-23-18.jpg'] },
            { name: 'أزرق', images: ['photo_2026-11-06_20-23-21.jpg', 'photo_2026-11-06_20-23-23.jpg'] }
        ]
    },
    {
        title: 'هودي ستريت وير',
        description: 'تصميم كاجوال من مجموعة ستريت وير، وتظهر الصور تفاصيله وألوانه.',
        season: 'winter',
        price: 650,
        type: 'hoodie',
        category: 'men',
        sizes: ['L', 'XL', '2XL', '3XL'],
        sizeLabel: 'اختر المقاس:',
        variants: [
            { name: 'أبيض', images: ['photo_2026-11-06_20-23-27.jpg', 'photo_2026-11-06_20-23-33.jpg'] },
            { name: 'نبيتي', images: ['photo_2026-11-06_20-23-28.jpg'] },
            { name: 'أسود', images: ['photo_2026-11-06_20-23-29.jpg', 'photo_2026-11-06_20-23-34.jpg'] },
            { name: 'أزرق', images: ['photo_2026-11-06_20-23-30.jpg', 'photo_2026-11-06_20-23-32.jpg'] }
        ]
    },
    {
        title: 'هودي زيوس الأولادي بتصميم Daniel',
        description: 'هودي زيوس أولادي بتصميم Daniel، متوفر بألوان ومقاسات متعددة.',
        season: 'winter',
        price: 650,
        type: 'hoodie',
        qr: true,
        category: 'kids',
        sizes: ['12', '14', '16', '18'],
        sizeLabel: 'اختر المقاس (سنوات):',
        variants: [
            { name: 'نبيتي', images: ['photo_2026-11-06_20-23-35.jpg', 'photo_2026-11-06_20-23-36 (2).jpg', 'photo_2026-11-06_20-23-36.jpg'] },
            { name: 'أسود', images: ['photo_2026-11-06_20-23-38.jpg', 'photo_2026-11-06_20-23-39.jpg'] },
            { name: 'أزرق', images: ['photo_2026-11-06_20-23-40 (2).jpg', 'photo_2026-11-06_20-23-40.jpg'] }
        ]
    },
    {
        title: 'هودي زيوس الرجالي - كود 2032',
        description: 'هودي رجالي من زيوس. اختر المقاس المتاح وتواصل معنا لتأكيد اللون.',
        season: 'winter',
        price: 650,
        type: 'hoodie',
        qr: true,
        category: 'men',
        sizes: ['L', 'XL', '2XL', '3XL'],
        sizeLabel: 'اختر المقاس:',
        images: ['photo_2026-11-06_20-24-03.jpg']
    },
    {
        title: 'طقم زيوس الرجالي البيج - كود 2032',
        description: 'طقم رجالي بدرجات البيج، مع صور متعددة للتفاصيل.',
        season: 'summer',
        price: 1250,
        oldPrice: 1550,
        bundle: true,
        type: 'set',
        qr: true,
        category: 'men',
        sizes: ['L', 'XL', '2XL', '3XL'],
        sizeLabel: 'اختر المقاس:',
        images: ['photo_2026-11-06_20-24-20.jpg', 'photo_2026-11-06_20-24-21 (2).jpg', 'photo_2026-11-06_20-24-21.jpg', 'photo_2026-11-06_20-24-23.jpg', 'photo_2026-11-06_20-24-26.jpg']
    },
    {
        title: 'طقم زيوس الرجالي الأخضر - كود 2033',
        description: 'طقم رجالي باللون الأخضر، وتظهر الصور تفاصيل القطع.',
        season: 'summer',
        price: 1250,
        oldPrice: 1550,
        bundle: true,
        type: 'set',
        qr: true,
        category: 'men',
        sizes: ['L', 'XL', '2XL', '3XL'],
        sizeLabel: 'اختر المقاس:',
        images: ['photo_2026-11-06_20-24-17.jpg']
    },
    {
        title: 'هودي Mamme الأسود',
        description: 'تصميم Mamme باللون الأسود، مع صور متعددة للتفاصيل.',
        season: 'summer',
        price: 650,
        type: 'hoodie',
        category: 'men',
        sizes: ['L', 'XL', '2XL', '3XL'],
        sizeLabel: 'اختر المقاس:',
        images: ['photo_2026-11-06_20-24-12.jpg', 'photo_2026-11-06_20-24-13.jpg']
    }
];

const products = [...storeProducts, ...(window.telegramProducts || [])];

const qrRightPhotos = new Set(['photo_2026-11-06_20-23-05.jpg']);
const cart = [];
let discountPercentage = 0;
let lastFocusedImage = null;
let toastTimer;
let activeCategory = 'men';

const productsGrid = document.getElementById('productsGrid');
const emptyState = document.getElementById('emptyState');
const cartDialog = document.getElementById('cartDialog');
const imageDialog = document.getElementById('imageDialog');
const toast = document.getElementById('toast');

function imageSetsFor(product) {
    return product.variants || [{ name: '', images: product.images }];
}

function makeProductCard(product, productIndex, sectionCategory) {
    const variants = imageSetsFor(product);
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.category = sectionCategory || product.category;
    card.dataset.type = product.type;
    card.dataset.name = `${product.title} ${variants.map(variant => variant.name).join(' ')}`.toLowerCase();
    card.dataset.price = product.price === null ? '' : String(product.price);
    card.dataset.order = String(productIndex);
    card.dataset.hasQr = String(Boolean(product.qr));
    card.dataset.images = JSON.stringify(variants[0].images);
    card.dataset.imageIndex = '0';

    const imageStage = document.createElement('div');
    imageStage.className = 'product-image-stage';

    const imageButton = document.createElement('button');
    imageButton.className = 'product-image-button';
    imageButton.type = 'button';
    imageButton.addEventListener('click', () => openImage(imageButton));

    const image = document.createElement('img');
    image.className = 'product-image';
    image.loading = 'lazy';
    const qrCover = document.createElement('span');
    qrCover.className = 'qr-cover';
    qrCover.setAttribute('aria-hidden', 'true');
    imageButton.append(image, qrCover);

    const previousButton = makeImageNavigationButton('previous', '‹', 'الصورة السابقة', card);
    const nextButton = makeImageNavigationButton('next', '›', 'الصورة التالية', card);
    const imageCount = document.createElement('span');
    imageCount.className = 'product-image-count';
    imageStage.append(imageButton, previousButton, nextButton, imageCount);
    if (product.bundle) {
        const bundleBadge = document.createElement('span');
        bundleBadge.className = 'product-bundle-badge';
        bundleBadge.textContent = 'طقم كامل';
        imageStage.appendChild(bundleBadge);
    }
    card.appendChild(imageStage);

    const info = document.createElement('div');
    info.className = 'product-info';
    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.title;
    const price = document.createElement('p');
    price.className = 'product-price';
    if (product.oldPrice) {
        const oldPrice = document.createElement('s');
        oldPrice.className = 'old-price';
        oldPrice.textContent = `${product.oldPrice} ج.م`;
        const currentPrice = document.createElement('strong');
        currentPrice.className = 'current-price';
        currentPrice.textContent = `${product.price} ج.م`;
        price.append(oldPrice, currentPrice);
    } else if (product.price === null) {
        price.textContent = 'السعر عند الطلب';
    } else {
        price.textContent = `${product.price} ج.م`;
    }
    info.append(title, price);
    const descriptionText = product.description || product.caption;
    if (descriptionText) {
        const description = document.createElement('p');
        description.className = 'product-description';
        description.textContent = descriptionText;
        info.appendChild(description);
    }

    let colorSelect = null;
    if (variants.length > 1) {
        const colorGroup = document.createElement('div');
        colorGroup.className = 'size-select-group';
        const colorLabel = document.createElement('label');
        colorLabel.htmlFor = `product-color-${productIndex}`;
        colorLabel.textContent = 'اختر اللون:';
        colorSelect = document.createElement('select');
        colorSelect.className = 'product-color';
        colorSelect.id = colorLabel.htmlFor;
        variants.forEach(variant => colorSelect.add(new Option(variant.name, variant.name)));
        colorSelect.addEventListener('change', () => {
            const selectedVariant = variants.find(variant => variant.name === colorSelect.value);
            card.dataset.images = JSON.stringify(selectedVariant.images);
            card.dataset.imageIndex = '0';
            updateProductImage(card);
        });
        colorGroup.append(colorLabel, colorSelect);
        info.appendChild(colorGroup);
    }

    let sizeSelect = null;
    if (product.sizes) {
        const sizeGroup = document.createElement('div');
        sizeGroup.className = 'size-select-group';
        const sizeLabel = document.createElement('label');
        sizeLabel.htmlFor = `product-size-${productIndex}`;
        sizeLabel.textContent = product.sizeLabel;
        sizeSelect = document.createElement('select');
        sizeSelect.id = sizeLabel.htmlFor;
        product.sizes.forEach(size => sizeSelect.add(new Option(size, size)));
        const sizeHeader = document.createElement('div');
        sizeHeader.className = 'size-group-header';
        const sizeGuideButton = document.createElement('button');
        sizeGuideButton.className = 'size-guide-button';
        sizeGuideButton.type = 'button';
        sizeGuideButton.textContent = 'جدول المقاسات';
        sizeGuideButton.setAttribute('aria-haspopup', 'dialog');
        sizeGuideButton.addEventListener('click', () => openSizeGuide(product.category));
        sizeHeader.append(sizeLabel, sizeGuideButton);
        sizeGroup.append(sizeHeader, sizeSelect);
        info.appendChild(sizeGroup);
    }
    card.appendChild(info);

    const actions = document.createElement('div');
    actions.className = 'product-actions';
    const actionButton = document.createElement('button');
    actionButton.type = 'button';
    if (product.price === null) {
        actionButton.className = 'btn-inquire';
        actionButton.textContent = 'استفسر عن السعر عبر واتساب';
        actionButton.addEventListener('click', () => inquireProduct(product.title, colorSelect?.value));
    } else {
        actionButton.className = 'btn-add';
        actionButton.textContent = 'أضف إلى السلة';
        actionButton.addEventListener('click', () => addToCart(product.title, product.price, sizeSelect.id, colorSelect?.id));
    }
    actions.appendChild(actionButton);
    card.appendChild(actions);
    updateProductImage(card);
    return card;
}

function makeImageNavigationButton(direction, text, label, card) {
    const button = document.createElement('button');
    button.className = `product-image-nav ${direction}`;
    button.type = 'button';
    button.textContent = text;
    button.setAttribute('aria-label', label);
    button.addEventListener('click', () => changeProductImage(card, direction === 'next' ? 1 : -1));
    return button;
}

function renderProducts() {
    productsGrid.replaceChildren();
    [
        { category: 'men', title: 'قسم الرجالي' },
        { category: 'kids', title: 'قسم الأولادي' },
        { category: 'summer', title: 'القسم الصيفي', season: 'summer' },
        { category: 'winter', title: 'القسم الشتوي', season: 'winter' },
        { category: 'channel', title: 'منتجات إضافية' }
    ].forEach(group => {
        const section = document.createElement('section');
        section.className = 'product-section';
        section.dataset.category = group.category;
        section.id = `${group.category}Panel`;
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-labelledby', `${group.category}Tab`);
        section.tabIndex = 0;

        const heading = document.createElement('h3');
        heading.className = 'product-section-title';
        heading.textContent = group.title;
        const grid = document.createElement('div');
        grid.className = 'products-grid';

        products.forEach((product, index) => {
            const matchesGroup = group.season
                ? product.season === group.season
                : product.category === group.category;
            if (matchesGroup) grid.appendChild(makeProductCard(product, index, group.category));
        });
        section.append(heading, grid);
        productsGrid.appendChild(section);
    });
    filterProducts();
}

function updateProductImage(card) {
    const images = JSON.parse(card.dataset.images);
    const index = Number(card.dataset.imageIndex);
    const image = card.querySelector('.product-image');
    const color = card.querySelector('.product-color')?.value;
    const title = card.querySelector('.product-title').textContent;
    const qrCover = card.querySelector('.qr-cover');

    image.src = `images/telegram/${images[index]}`;
    image.alt = `${title}${color ? ` - ${color}` : ''}`;
    qrCover.hidden = card.dataset.hasQr !== 'true';
    qrCover.classList.toggle('right', qrRightPhotos.has(images[index]));
    card.querySelector('.product-image-button').setAttribute('aria-label', `عرض صورة ${image.alt} بحجم أكبر`);

    const count = card.querySelector('.product-image-count');
    count.textContent = `${index + 1} / ${images.length}`;
    count.hidden = images.length < 2;
    card.querySelectorAll('.product-image-nav').forEach(button => {
        button.hidden = images.length < 2;
    });
}

function changeProductImage(card, direction) {
    const images = JSON.parse(card.dataset.images);
    const currentIndex = Number(card.dataset.imageIndex);
    card.dataset.imageIndex = String((currentIndex + direction + images.length) % images.length);
    updateProductImage(card);
}

function openImage(button) {
    const image = button.querySelector('img');
    const card = button.closest('.product-card');
    const selectedColor = card.querySelector('.product-color')?.value;
    const title = card.querySelector('.product-title').textContent;
    const modalQrCover = document.getElementById('lightboxQrCover');

    lastFocusedImage = button;
    document.getElementById('lightboxImage').src = image.src;
    document.getElementById('lightboxImage').alt = image.alt;
    document.getElementById('lightboxTitle').textContent = selectedColor ? `${title} - ${selectedColor}` : title;
    modalQrCover.hidden = card.dataset.hasQr !== 'true';
    modalQrCover.classList.toggle('right', qrRightPhotos.has(image.src.split('/').pop()));
    imageDialog.showModal();
}

function closeImage() {
    if (imageDialog.open) imageDialog.close();
}

function inquireProduct(name, color) {
    const details = color ? ` - اللون ${color}` : '';
    const message = `السلام عليكم، أريد معرفة سعر ومقاسات ${name}${details}.`;
    window.open(`https://wa.me/201279564188?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.replaceChildren();
    cartEmpty.hidden = cart.length > 0;

    let subtotal = 0;
    let itemCount = 0;
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        itemCount += item.quantity;
        const row = document.createElement('li');
        row.className = 'cart-item';
        const details = document.createElement('span');
        details.textContent = `${item.name} (${item.size}) × ${item.quantity} · ${item.price * item.quantity} ج.م`;
        const removeButton = document.createElement('button');
        removeButton.className = 'cart-remove';
        removeButton.type = 'button';
        removeButton.textContent = '×';
        removeButton.setAttribute('aria-label', `حذف ${item.name} من السلة`);
        removeButton.addEventListener('click', () => {
            cart.splice(index, 1);
            renderCart();
        });
        row.append(details, removeButton);
        cartItems.appendChild(row);
    });

    const total = subtotal * (1 - discountPercentage / 100);
    document.getElementById('cartCount').textContent = String(itemCount);
    cartTotal.textContent = `الإجمالي قبل الشحن: ${total.toFixed(0)} ج.م`;
}

function addToCart(name, price, sizeSelectId, colorSelectId) {
    const size = document.getElementById(sizeSelectId).value;
    const color = colorSelectId ? document.getElementById(colorSelectId).value : '';
    const itemName = color ? `${name} (${color})` : name;
    const existing = cart.find(item => item.name === itemName && item.size === size);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: itemName, price, size, quantity: 1 });
    }
    renderCart();
    showToast('تمت إضافة المنتج إلى السلة.');
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLocaleLowerCase('ar');
    const type = document.getElementById('typeFilter').value;
    const sortOrder = document.getElementById('priceSort').value;
    let visibleCount = 0;

    productsGrid.querySelectorAll('.product-card').forEach(card => {
        const matchesText = card.dataset.name.toLocaleLowerCase('ar').includes(searchTerm);
        const matchesCategory = card.dataset.category === activeCategory;
        const matchesType = type === 'all' || card.dataset.type === type;
        card.hidden = !(matchesText && matchesCategory && matchesType);
        if (!card.hidden) visibleCount += 1;
    });
    productsGrid.querySelectorAll('.product-section').forEach(section => {
        section.hidden = section.dataset.category !== activeCategory || !section.querySelector('.product-card:not([hidden])');
    });
    const activeGrid = productsGrid.querySelector(`#${activeCategory}Panel .products-grid`);
    if (activeGrid) {
        const cards = [...activeGrid.querySelectorAll('.product-card')];
        cards.sort((first, second) => {
            if (sortOrder !== 'default') {
                const firstPrice = first.dataset.price === '' ? Number.POSITIVE_INFINITY : Number(first.dataset.price);
                const secondPrice = second.dataset.price === '' ? Number.POSITIVE_INFINITY : Number(second.dataset.price);
                if (firstPrice !== secondPrice) {
                    return sortOrder === 'low-high' ? firstPrice - secondPrice : secondPrice - firstPrice;
                }
            }
            return Number(first.dataset.order) - Number(second.dataset.order);
        });
        activeGrid.append(...cards);
    }
    emptyState.hidden = visibleCount > 0;
}

function openSizeGuide(category) {
    document.getElementById('adultSizeGuide').hidden = category !== 'men';
    document.getElementById('kidsSizeGuide').hidden = category !== 'kids';
    document.getElementById('sizeGuideDialog').showModal();
}

function activateCategory(category) {
    activeCategory = category;
    document.querySelectorAll('.category-tab').forEach(tab => {
        const isSelected = tab.dataset.category === category;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });
    filterProducts();
}

function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    const status = document.getElementById('couponStatus');
    if (code === 'AYAD10') {
        discountPercentage = 10;
        status.textContent = 'تم تطبيق خصم 10٪.';
    } else {
        discountPercentage = 0;
        status.textContent = 'كود الخصم غير صحيح.';
    }
    renderCart();
}

function checkout(event) {
    event.preventDefault();
    if (cart.length === 0) {
        showToast('أضف منتجًا إلى السلة أولًا.');
        return;
    }

    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    if (!name || !address) return;

    const lines = cart.map(item => `- ${item.name} | المقاس: ${item.size} | الكمية: ${item.quantity} | السعر: ${item.price * item.quantity} ج.م`);
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = subtotal * (1 - discountPercentage / 100);
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const message = [
        'طلب جديد من متجر أولاد عياد',
        `رقم الطلب: #${orderId}`,
        `اسم العميل: ${name}`,
        `العنوان: ${address}`,
        'المنتجات المطلوبة:',
        ...lines,
        discountPercentage ? 'الخصم المطبق: 10٪' : '',
        `الإجمالي قبل الشحن: ${total.toFixed(0)} ج.م`,
        'الدفع: انستا باي / محفظة على رقم 01279564188',
        'يرجى إرسال صورة إيصال التحويل في نفس محادثة واتساب.'
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/201279564188?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('typeFilter').addEventListener('change', filterProducts);
document.getElementById('priceSort').addEventListener('change', filterProducts);
document.querySelectorAll('.category-tab').forEach((tab, index, tabs) => {
    tab.addEventListener('click', () => activateCategory(tab.dataset.category));
    tab.addEventListener('keydown', event => {
        let nextIndex = index;
        if (event.key === 'ArrowLeft') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowRight') nextIndex = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;

        event.preventDefault();
        tabs[nextIndex].focus();
        activateCategory(tabs[nextIndex].dataset.category);
    });
});
document.getElementById('openCart').addEventListener('click', () => cartDialog.showModal());
document.getElementById('applyCoupon').addEventListener('click', applyCoupon);
document.getElementById('checkoutForm').addEventListener('submit', checkout);
document.querySelectorAll('[data-close-dialog]').forEach(button => {
    button.addEventListener('click', () => document.getElementById(button.dataset.closeDialog).close());
});
document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
});
imageDialog.addEventListener('close', () => {
    if (lastFocusedImage) lastFocusedImage.focus();
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && imageDialog.open) closeImage();
});

renderProducts();
renderCart();
