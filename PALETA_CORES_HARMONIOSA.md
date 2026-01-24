# 🎨 Paleta de Cores Harmoniosa - Portfolio

## **Cores Principais (Harmonia Analogal)**

### 🔷 **Índigo (Primary)**
- `--primary-color: #6366f1` - Cor principal (azul índigo)
- `--primary-light: #818cf8` - Índigo claro
- `--primary-dark: #4f46e5` - Índigo escuro

### 🔷 **Cyan (Destaque)**
- `--cyan-main: #06b6d4` - Cyan principal
- `--cyan-light: #22d3ee` - Cyan claro
- `--cyan-dark: #0891b2` - Cyan escuro

### 🟣 **Roxo (Secundário)**
- `--purple-main: #a855f7` - Roxo principal
- `--purple-light: #d8b4fe` - Roxo claro
- `--purple-dark: #9333ea` - Roxo escuro

### 🟢 **Verde (Acentos)**
- `--accent-color: #22c55e` - Verde principal
- `--accent-light: #86efac` - Verde claro
- `--accent-dark: #16a34a` - Verde escuro

### 🟡 **Âmbar (Acentos)**
- `#f59e0b` - Amarelo/Âmbar (para badges e destaques)

---

## **Como as Cores São Usadas**

### **Hero Section**
- Background: Gradiente entre Índigo e tons escuros
- CTAs: Gradiente Índigo → Roxo
- Badge Disponível: Verde (pulsante)
- Badges Oportunidades: Cyan + Roxo
- Imagem: Glow em Cyan + Roxo

### **Cards de Skills**
- React: Cyan (`#06b6d4`)
- Mobile-First: Roxo (`#a855f7`)
- Arquitetura: Verde (`#22c55e`)
- UX/UI: Âmbar (`#f59e0b`)

### **Featured Projects**
- Border: Índigo
- Badges: Gradiente Cyan → Índigo (secundário) ou Laranja (destaque)

### **Botões**
- Primário: Gradiente Índigo → Roxo
- Secundário (Contato): Borda Cyan com hover em Cyan

### **Tecnologias**
- Proficiência Avançada: Verde
- Proficiência Intermediária: Âmbar

---

## **Benefícios da Paleta Harmoniosa**

✅ **Coesão Visual**: Cores análogas (Índigo, Cyan, Roxo) criam harmonia  
✅ **Hierarquia Clara**: Verde e Âmbar destacam elementos importantes  
✅ **Profissionalismo**: Tons saturados e contrastados  
✅ **Acessibilidade**: Suficiente contraste para leitura  
✅ **Consistência**: Mesmas cores usadas em todo o portfólio  
✅ **Modernidade**: Paleta atualizada e contemporary  

---

## **Utilização Técnica**

Todas as cores principais estão definidas em variáveis CSS no `:root`:

```css
:root {
  --primary-color: #6366f1;
  --primary-light: #818cf8;
  --cyan-main: #06b6d4;
  --purple-main: #a855f7;
  --accent-color: #22c55e;
  /* ... e mais */
}
```

**Sempre use as variáveis ao invés de valores hardcoded para manter a harmonia!**

---

**Status**: ✅ Implementado em 23/01/2026
**Paleta**: Análoga (Índigo → Cyan → Roxo) com acentos em Verde e Âmbar
