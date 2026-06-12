$htmlFiles = Get-ChildItem -Path "c:\Users\Dell\Documents\meet-main" -Filter "*.html" | Select-Object -ExpandProperty FullName
foreach ($file in $htmlFiles) {
    if ($file -match "ref\.html") { continue }
    $content = Get-Content $file -Raw
    
    $newContent = $content -replace '<div class="menu-toggle" id="menu-toggle">\s*<i class="fas fa-bars"></i>\s*</div>', "<div class=`"menu-toggle`" id=`"menu-toggle`">`r`n    <span></span>`r`n    <span></span>`r`n    <span></span>`r`n</div>"
    
    $newContent = $newContent -replace 'nav\.classList\.toggle\("active"\);\s*\}\);', "nav.classList.toggle(`"active`");`r`n        menu.classList.toggle(`"open`");`r`n    });"
    
    Set-Content -Path $file -Value $newContent -Encoding UTF8
}
