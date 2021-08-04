package com.osds.bitz.controller;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@Api("Main 컨트롤러 API V1")
@Slf4j
public class MainController {

    @GetMapping("/")
    public RedirectView index() {
        return new RedirectView("/");
    }
}
