.386
.model flat, stdcall, c
.stack 4096

.data
string DWORD 10 DUP(48) ; set a size 10 array with 0s
number DWORD 4352978
print DWORD 48, 0
base DWORD 1000000000
.code
includelib libucrt.lib
includelib legacy_stdio_definitions.lib
includelib libcmt.lib
includelib libvcruntime.lib

extrn printf:near
extrn exit:near

public main
main proc
    call decomp
main endp
decomp proc
    mov esi, offset string
    sub esi, 4
    top:;;
        add esi, 4
        mov eax, [number] ;put the current value into eax
        mov ebx, [base]
        ;;sub edx, edx
        call division ; edx has result of eax div ebx
        mov [number], eax
        ;;mov edx, eax
        add [esi], ecx

        ;;mov eax, ecx
        ;;mov eax, edx

        ;;mov eax, edx
        ;;mov ecx, [base]
        ;;call multiplication
        ;;mov ebx, edx
        ;;mov eax, [number]
        ;;sub eax, ebx
        ;;mov [number], eax
        ;;sub edx, edx

        mov eax, [base]
        mov ebx, 10
        call division
        mov [base], ecx
        cmp esi, offset string + 36
        jl top
        ;;

    mov eax, 0
    sub esi, 36
    mov ebx, 1000000000
    mov [base], ebx
    skiper:
        mov ebx, [esi]
        cmp ebx, 48
        jne done
        add esi, 4
        jmp skiper
        done:
            
    printer:
        mov ebx, [esi]
        mov print, ebx
        push offset print
        call printf
        push 0
        mov print, 48
        mov ebx, 48
        mov [esi], ebx
        add esi, 4
        cmp esi, offset string + 40
        jl printer
        
        ;;
    mov print, 012
    push offset print
    call printf
    push 0
    mov print, 48
    sub esi, 40
    ret
decomp endp

division proc;divides var1 by var2 using reiterration
    mov ecx, 0
    body:
        cmp eax, ebx
        jl done
        sub eax, ebx
        add ecx, 1
        jmp body
    done:
        ret
division endp
end