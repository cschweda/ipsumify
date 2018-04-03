# ipsumify.me

Generate Lorum Ipsum in Markdown, html, and plain text. Layout patterns can also be specified.

## Site

https://ipsumify.me

## Layout pattern options

* `h` + `number < 7` = Heading level 1-6
* `p` + `number` = Paragraph + max number of sentences (minimum = max /2)
* `ir` = Placeholder image float right
* `il` = Placeholder image float left
* `-` = Element separator

## Example:

`h1-p12-h2-p4`

## Markdown output:

```
# Voluptate incididunt irure mollit sunt ad et eiusmod mollit ullamco ut ex et.

Qui reprehenderit tempor in Lorem tempor deserunt aliqua do. Mollit eu mollit ut consequat est sint ullamco. Cillum id in nostrud mollit ad incididunt ad consequat duis. Quis culpa sit enim voluptate id cillum qui dolor incididunt enim. Amet labore voluptate adipisicing anim tempor occaecat laboris proident mollit dolor. Incididunt laborum adipisicing incididunt et Lorem minim aliquip. Proident occaecat nisi anim ipsum tempor ea velit et. Magna eu Lorem tempor sit sint cupidatat tempor consequat quis. Enim occaecat elit commodo id Lorem aliquip commodo aliquip esse esse id. Esse elit incididunt excepteur laboris eu consequat.

## Qui occaecat ea aliqua duis ut ad ea adipisicing quis et enim dolore ea magna.

Eu est laborum irure. Labore qui anim velit. Et veniam. Laboris aute do ullamco. Amet Lorem do. Aliqua laboris duis velit. Sunt est. Elit elit ea enim. Commodo nisi ea sint. Occaecat ad mollit.
```

## Rendered HTML output:

> # Voluptate incididunt irure mollit sunt ad et eiusmod mollit ullamco ut ex et.

> Qui reprehenderit tempor in Lorem tempor deserunt aliqua do. Mollit eu mollit ut consequat est sint ullamco. Cillum id in nostrud mollit ad incididunt ad consequat duis. Quis culpa sit enim voluptate id cillum qui dolor incididunt enim. Amet labore voluptate adipisicing anim tempor occaecat laboris proident mollit dolor. Incididunt laborum adipisicing incididunt et Lorem minim aliquip. Proident occaecat nisi anim ipsum tempor ea velit et. Magna eu Lorem tempor sit sint cupidatat tempor consequat quis. Enim occaecat elit commodo id Lorem aliquip commodo aliquip esse esse id. Esse elit incididunt excepteur laboris eu consequat.

> ## Qui occaecat ea aliqua duis ut ad ea adipisicing quis et enim dolore ea magna.

> Eu est laborum irure. Labore qui anim velit. Et veniam. Laboris aute do ullamco. Amet Lorem do. Aliqua laboris duis velit. Sunt est. Elit elit ea enim. Commodo nisi ea sint. Occaecat ad mollit.

## TO-DO:

* Vuex integration
* Error checking for layout patterns
* Additional layout elements (including bold/italics/unodered lists)
* Save markdown/html/text to file.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
