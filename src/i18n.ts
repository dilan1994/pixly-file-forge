import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.converter": "Converter",
      "nav.guide": "Guide",
      "nav.faq": "FAQ",
      "nav.auto": "Auto:",
      "nav.quality": "Quality:",
      
      // Main Content
      "main.title": "Convert Images Instantly ✨",
      "main.subtitle": "Transform your images between formats with high quality and lightning speed. All processing happens securely in your browser.",
      "main.enhanced": "🚀 Enhanced Version - Updated with Modern UI & Features",
      
      // Quick Conversion Options
      "conversion.title": "Quick Conversion Options",
      "conversion.subtitle": "Choose your conversion type and start transforming your images instantly",
      "conversion.ready": "Ready to convert",
      "conversion.with_transparency": "with transparency support",
      
      // Conversion Types
      "format.jpg_to_png": "JPG → PNG",
      "format.png_to_jpg": "PNG → JPG",
      "format.heic_to_jpg": "HEIC → JPG",
      "format.webp_to_png": "WebP → PNG",
      "format.webp_to_jpg": "WebP → JPG",
      "format.pdf_to_jpg": "PDF → JPG",
      "format.bmp_to_png": "BMP → PNG",
      "format.tiff_to_jpg": "TIFF → JPG",
      "format.gif_to_png": "GIF → PNG",
      "format.svg_to_png": "SVG → PNG",
      "format.ico_to_png": "ICO → PNG",
      "format.any_to_webp": "Any → WebP",
      
      // Upload Area
      "upload.title": "Drag & drop images or PDFs here",
      "upload.browse": "or click to browse files",
      "upload.converting_to": "Converting to",
      "upload.max_size": "Max 10MB per file",
      "upload.supported_formats": "Supported formats: JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO, PDF",
      
      // Features
      "features.title": "Powerful Image Conversion Features",
      "features.subtitle": "Convert your images between multiple formats with high quality and speed. All processing happens in your browser for maximum privacy.",
      
      "features.multiple.title": "12 Format Support",
      "features.multiple.description": "Support for JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO, and PDF formats with high-quality conversion and transparency preservation.",
      "features.multiple.action": "Learn more",
      
      "features.batch.title": "Batch Processing",
      "features.batch.description": "Convert multiple images at once with drag & drop support, progress tracking, and queue management for efficient bulk processing.",
      "features.batch.action": "Start batch conversion",
      
      "features.download.title": "Easy Download",
      "features.download.description": "Download converted files individually or as a ZIP archive for bulk downloads. Auto-download option available for seamless workflow.",
      "features.download.action": "Download options",
      
      "features.privacy.title": "Privacy First",
      "features.privacy.description": "All processing in browser",
      
      "features.fast.title": "Lightning Fast",
      "features.fast.description": "Instant conversions",
      
      "features.quality.title": "High Quality",
      "features.quality.description": "Lossless conversion",
      
      // Controls
      "controls.settings": "Settings",
      "controls.clear_all": "Clear All",
      "controls.convert_files": "Convert Files",
      "controls.converting": "Converting...",
      "controls.pending": "pending",
      "controls.completed": "completed",
      
      // Settings
      "settings.quality": "Quality",
      "settings.output_format": "Output Format",
      "settings.maintain_aspect_ratio": "Maintain aspect ratio",
      "settings.auto_download": "Auto Download",
      "settings.high": "High",
      "settings.medium": "Medium",
      "settings.low": "Low",
      "settings.max": "Max",
      
      // Theme
      "theme.light": "Light",
      "theme.dark": "Dark",
      "theme.cyber": "Cyber",
      
      // Footer
      "footer.product": "Product",
      "footer.resources": "Resources",
      "footer.company": "Company",
      "footer.legal": "Legal",
      
      "footer.image_converter": "Image Converter",
      "footer.batch_processing": "Batch Processing",
      "footer.api_access": "API Access",
      "footer.mobile_app": "Mobile App",
      
      "footer.user_guide": "User Guide",
      "footer.faq": "FAQ",
      "footer.blog": "Blog",
      "footer.changelog": "Changelog",
      
      "footer.about_us": "About Us",
      "footer.contact": "Contact",
      "footer.support": "Support",
      "footer.careers": "Careers",
      
      "footer.privacy_policy": "Privacy Policy",
      "footer.terms_of_service": "Terms of Service",
      "footer.cookie_policy": "Cookie Policy",
      "footer.gdpr": "GDPR",
      
      "footer.copyright": "© 2024 Pixly Forge. Made with ❤️ for creators worldwide.",
      "footer.preferences": "Preferences",
      "footer.language": "Language:",
      "footer.quality_preset": "Quality:",
      "footer.default_format": "Format:",
      "footer.theme": "Theme:"
    }
  },
  es: {
    translation: {
      // Navigation
      "nav.converter": "Convertidor",
      "nav.guide": "Guía",
      "nav.faq": "FAQ",
      "nav.auto": "Auto:",
      "nav.quality": "Calidad:",
      
      // Main Content
      "main.title": "Convierte Imágenes Instantáneamente ✨",
      "main.subtitle": "Transforma tus imágenes entre formatos con alta calidad y velocidad increíble. Todo el procesamiento ocurre de forma segura en tu navegador.",
      "main.enhanced": "🚀 Versión Mejorada - Actualizada con UI Moderna y Funciones",
      
      // Quick Conversion Options
      "conversion.title": "Opciones de Conversión Rápida",
      "conversion.subtitle": "Elige tu tipo de conversión y comienza a transformar tus imágenes instantáneamente",
      "conversion.ready": "Listo para convertir",
      "conversion.with_transparency": "con soporte de transparencia",
      
      // Upload Area
      "upload.title": "Arrastra y suelta imágenes o PDFs aquí",
      "upload.browse": "o haz clic para buscar archivos",
      "upload.converting_to": "Convirtiendo a",
      "upload.max_size": "Máx 10MB por archivo",
      "upload.supported_formats": "Formatos soportados: JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO, PDF",
      
      // Features
      "features.title": "Potentes Funciones de Conversión de Imágenes",
      "features.subtitle": "Convierte tus imágenes entre múltiples formatos con alta calidad y velocidad. Todo el procesamiento ocurre en tu navegador para máxima privacidad.",
      
      "features.multiple.title": "Soporte para 12 Formatos",
      "features.multiple.description": "Soporte para formatos JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO y PDF con conversión de alta calidad y preservación de transparencia.",
      "features.multiple.action": "Aprende más",
      
      "features.batch.title": "Procesamiento por Lotes",
      "features.batch.description": "Convierte múltiples imágenes a la vez con soporte de arrastrar y soltar, seguimiento de progreso y gestión de cola para procesamiento eficiente en lote.",
      "features.batch.action": "Iniciar conversión por lotes",
      
      "features.download.title": "Descarga Fácil",
      "features.download.description": "Descarga archivos convertidos individualmente o como archivo ZIP para descargas en lote. Opción de descarga automática disponible para flujo de trabajo sin interrupciones.",
      "features.download.action": "Opciones de descarga",
      
      // Controls
      "controls.settings": "Configuración",
      "controls.clear_all": "Limpiar Todo",
      "controls.convert_files": "Convertir Archivos",
      "controls.converting": "Convirtiendo...",
      "controls.pending": "pendiente",
      "controls.completed": "completado",
      
      // Theme
      "theme.light": "Claro",
      "theme.dark": "Oscuro",
      "theme.cyber": "Cyber"
    }
  },
  fr: {
    translation: {
      "nav.converter": "Convertisseur",
      "nav.guide": "Guide",
      "nav.faq": "FAQ",
      "nav.auto": "Auto:",
      "nav.quality": "Qualité:",
      
      "main.title": "Convertir des Images Instantanément ✨",
      "main.subtitle": "Transformez vos images entre formats avec une haute qualité et une vitesse fulgurante. Tout le traitement se fait en sécurité dans votre navigateur.",
      "main.enhanced": "🚀 Version Améliorée - Mise à jour avec UI Moderne et Fonctionnalités",
      
      "conversion.title": "Options de Conversion Rapide",
      "conversion.subtitle": "Choisissez votre type de conversion et commencez à transformer vos images instantanément",
      "conversion.ready": "Prêt à convertir",
      "conversion.with_transparency": "avec support de transparence",
      
      "upload.title": "Glissez-déposez les images ou PDFs ici",
      "upload.browse": "ou cliquez pour parcourir les fichiers",
      "upload.converting_to": "Conversion vers",
      "upload.max_size": "Max 10MB par fichier",
      
      "features.title": "Fonctionnalités Puissantes de Conversion d'Images",
      "features.subtitle": "Convertissez vos images entre plusieurs formats avec haute qualité et vitesse. Tout le traitement se fait dans votre navigateur pour une confidentialité maximale.",
      
      "features.multiple.title": "Support de 12 Formats",
      "features.multiple.description": "Support pour les formats JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO et PDF avec conversion haute qualité et préservation de transparence.",
      "features.multiple.action": "En savoir plus",
      
      "controls.settings": "Paramètres",
      "controls.clear_all": "Tout Effacer",
      "controls.convert_files": "Convertir les Fichiers",
      "controls.converting": "Conversion...",
      
      "theme.light": "Clair",
      "theme.dark": "Sombre",
      "theme.cyber": "Cyber"
    }
  },
  de: {
    translation: {
      "nav.converter": "Konverter",
      "nav.guide": "Anleitung",
      "nav.faq": "FAQ",
      "nav.auto": "Auto:",
      "nav.quality": "Qualität:",
      
      "main.title": "Bilder Sofort Konvertieren ✨",
      "main.subtitle": "Verwandeln Sie Ihre Bilder zwischen Formaten mit hoher Qualität und blitzschneller Geschwindigkeit. Alle Verarbeitung erfolgt sicher in Ihrem Browser.",
      "main.enhanced": "🚀 Erweiterte Version - Aktualisiert mit moderner UI und Funktionen",
      
      "conversion.title": "Schnelle Konvertierungsoptionen",
      "conversion.subtitle": "Wählen Sie Ihren Konvertierungstyp und beginnen Sie sofort mit der Transformation Ihrer Bilder",
      "conversion.ready": "Bereit zum Konvertieren",
      "conversion.with_transparency": "mit Transparenz-Unterstützung",
      
      "upload.title": "Bilder oder PDFs hier ablegen",
      "upload.browse": "oder klicken Sie zum Durchsuchen",
      "upload.converting_to": "Konvertierung zu",
      "upload.max_size": "Max 10MB pro Datei",
      
      "features.title": "Leistungsstarke Bildkonvertierungsfunktionen",
      "features.subtitle": "Konvertieren Sie Ihre Bilder zwischen mehreren Formaten mit hoher Qualität und Geschwindigkeit. Alle Verarbeitung erfolgt in Ihrem Browser für maximale Privatsphäre.",
      
      "features.multiple.title": "12 Format-Unterstützung",
      "features.multiple.description": "Unterstützung für JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO und PDF-Formate mit hochwertiger Konvertierung und Transparenz-Erhaltung.",
      "features.multiple.action": "Mehr erfahren",
      
      "controls.settings": "Einstellungen",
      "controls.clear_all": "Alle Löschen",
      "controls.convert_files": "Dateien Konvertieren",
      "controls.converting": "Konvertierung...",
      
      "theme.light": "Hell",
      "theme.dark": "Dunkel",
      "theme.cyber": "Cyber"
    }
  },
  ja: {
    translation: {
      "nav.converter": "コンバーター",
      "nav.guide": "ガイド",
      "nav.faq": "FAQ",
      "nav.auto": "自動:",
      "nav.quality": "品質:",
      
      "main.title": "画像を瞬時に変換 ✨",
      "main.subtitle": "高品質で超高速に画像フォーマットを変換。すべての処理はブラウザ内で安全に実行されます。",
      "main.enhanced": "🚀 拡張版 - モダンUIと機能でアップデート",
      
      "conversion.title": "クイック変換オプション",
      "conversion.subtitle": "変換タイプを選択して、画像の変換を即座に開始",
      "conversion.ready": "変換準備完了",
      "conversion.with_transparency": "透明度サポート付き",
      
      "upload.title": "画像やPDFをここにドラッグ&ドロップ",
      "upload.browse": "またはクリックしてファイルを参照",
      "upload.converting_to": "変換先",
      "upload.max_size": "最大10MB/ファイル",
      
      "features.title": "強力な画像変換機能",
      "features.subtitle": "高品質と高速で複数のフォーマット間で画像を変換。すべての処理はブラウザで行われ、最大限のプライバシーを確保。",
      
      "features.multiple.title": "12フォーマット対応",
      "features.multiple.description": "JPG、PNG、WebP、HEIC、BMP、TIFF、GIF、SVG、ICO、PDFフォーマットに対応し、高品質変換と透明度保持を実現。",
      "features.multiple.action": "詳細を見る",
      
      "controls.settings": "設定",
      "controls.clear_all": "すべてクリア",
      "controls.convert_files": "ファイル変換",
      "controls.converting": "変換中...",
      
      "theme.light": "ライト",
      "theme.dark": "ダーク",
      "theme.cyber": "サイバー"
    }
  },
  zh: {
    translation: {
      "nav.converter": "转换器",
      "nav.guide": "指南",
      "nav.faq": "常见问题",
      "nav.auto": "自动:",
      "nav.quality": "质量:",
      
      "main.title": "即时转换图像 ✨",
      "main.subtitle": "以高质量和闪电般的速度在格式之间转换您的图像。所有处理都在您的浏览器中安全进行。",
      "main.enhanced": "🚀 增强版 - 现代UI和功能更新",
      
      "conversion.title": "快速转换选项",
      "conversion.subtitle": "选择您的转换类型并立即开始转换您的图像",
      "conversion.ready": "准备转换",
      "conversion.with_transparency": "支持透明度",
      
      "upload.title": "拖拽图像或PDF到此处",
      "upload.browse": "或点击浏览文件",
      "upload.converting_to": "转换为",
      "upload.max_size": "最大10MB/文件",
      
      "features.title": "强大的图像转换功能",
      "features.subtitle": "以高质量和速度在多种格式之间转换您的图像。所有处理都在您的浏览器中进行，确保最大隐私。",
      
      "features.multiple.title": "支持12种格式",
      "features.multiple.description": "支持JPG、PNG、WebP、HEIC、BMP、TIFF、GIF、SVG、ICO和PDF格式，提供高质量转换和透明度保持。",
      "features.multiple.action": "了解更多",
      
      "controls.settings": "设置",
      "controls.clear_all": "清除全部",
      "controls.convert_files": "转换文件",
      "controls.converting": "转换中...",
      
      "theme.light": "浅色",
      "theme.dark": "深色",
      "theme.cyber": "赛博"
    }
  },
  ko: {
    translation: {
      "nav.converter": "변환기",
      "nav.guide": "가이드",
      "nav.faq": "FAQ",
      "nav.auto": "자동:",
      "nav.quality": "품질:",
      
      "main.title": "이미지 즉시 변환 ✨",
      "main.subtitle": "고품질과 번개같은 속도로 이미지를 포맷 간 변환하세요. 모든 처리는 브라우저에서 안전하게 이루어집니다.",
      "main.enhanced": "🚀 향상된 버전 - 현대적 UI와 기능으로 업데이트",
      
      "conversion.title": "빠른 변환 옵션",
      "conversion.subtitle": "변환 유형을 선택하고 이미지 변환을 즉시 시작하세요",
      "conversion.ready": "변환 준비 완료",
      "conversion.with_transparency": "투명도 지원",
      
      "upload.title": "이미지나 PDF를 여기로 드래그 앤 드롭",
      "upload.browse": "또는 클릭하여 파일 찾아보기",
      "upload.converting_to": "변환 대상",
      "upload.max_size": "최대 10MB/파일",
      
      "features.title": "강력한 이미지 변환 기능",
      "features.subtitle": "고품질과 속도로 여러 형식 간에 이미지를 변환하세요. 모든 처리는 최대 개인정보 보호를 위해 브라우저에서 이루어집니다.",
      
      "features.multiple.title": "12가지 형식 지원",
      "features.multiple.description": "JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO, PDF 형식을 지원하며 고품질 변환과 투명도 보존을 제공합니다.",
      "features.multiple.action": "자세히 보기",
      
      "controls.settings": "설정",
      "controls.clear_all": "모두 지우기",
      "controls.convert_files": "파일 변환",
      "controls.converting": "변환 중...",
      
      "theme.light": "라이트",
      "theme.dark": "다크",
      "theme.cyber": "사이버"
    }
  },
  pt: {
    translation: {
      "nav.converter": "Conversor",
      "nav.guide": "Guia",
      "nav.faq": "FAQ",
      "nav.auto": "Auto:",
      "nav.quality": "Qualidade:",
      
      "main.title": "Converter Imagens Instantaneamente ✨",
      "main.subtitle": "Transforme suas imagens entre formatos com alta qualidade e velocidade extrema. Todo processamento acontece com segurança no seu navegador.",
      "main.enhanced": "🚀 Versão Aprimorada - Atualizada com UI Moderna e Recursos",
      
      "conversion.title": "Opções de Conversão Rápida",
      "conversion.subtitle": "Escolha seu tipo de conversão e comece a transformar suas imagens instantaneamente",
      "conversion.ready": "Pronto para converter",
      "conversion.with_transparency": "com suporte a transparência",
      
      "upload.title": "Arraste e solte imagens ou PDFs aqui",
      "upload.browse": "ou clique para procurar arquivos",
      "upload.converting_to": "Convertendo para",
      "upload.max_size": "Máx 10MB por arquivo",
      
      "features.title": "Recursos Poderosos de Conversão de Imagens",
      "features.subtitle": "Converta suas imagens entre múltiplos formatos com alta qualidade e velocidade. Todo processamento acontece no seu navegador para máxima privacidade.",
      
      "features.multiple.title": "Suporte a 12 Formatos",
      "features.multiple.description": "Suporte para formatos JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO e PDF com conversão de alta qualidade e preservação de transparência.",
      "features.multiple.action": "Saiba mais",
      
      "controls.settings": "Configurações",
      "controls.clear_all": "Limpar Tudo",
      "controls.convert_files": "Converter Arquivos",
      "controls.converting": "Convertendo...",
      
      "theme.light": "Claro",
      "theme.dark": "Escuro",
      "theme.cyber": "Cyber"
    }
  }
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language
    debug: false, // Set to true for development
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false, // React already escapes
    },
    
    // Namespace options
    defaultNS: 'translation',
    ns: ['translation'],
  });

export default i18n; 