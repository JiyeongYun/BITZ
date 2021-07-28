package com.web.curation.controller.account;

import java.util.Optional;

import javax.validation.Valid;

import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.SignupRequest;
import com.web.curation.model.user.User;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@ApiResponses(value = {@ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class)})

@CrossOrigin("*")
@RestController
@RequestMapping("/account")
@Api("Account 컨트롤러 API V1")
public class AccountController {

    @Autowired
    UserDao userDao;

    @GetMapping("/login")
    @ApiOperation(value = "로그인", notes = "회원의 정보를 통해 로그인 처리를 합니다.")
    public Object login(@RequestParam(required = true) final String email,
                        @RequestParam(required = true) final String password) {

        Optional<User> userOpt = userDao.findUserByEmailAndPassword(email, password);

        ResponseEntity response = null;

        if (userOpt.isPresent()) {
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.data = "success";

            response = new ResponseEntity<>(userOpt, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @PostMapping("/signup")
    @ApiOperation(value = "가입하기", notes = "회원의 정보를 DB에 저장합니다.")
    public Object signup(@Valid @RequestBody SignupRequest request) {
        // 이메일, 닉네임 중복처리 필수
        if (userDao.getUserByEmail(request.getEmail()) != null)
            throw new IllegalArgumentException("중복된 이메일입니다.");

        if (userDao.getUserByNickname(request.getNickname()) != null)
            throw new IllegalArgumentException("중복된 닉네임입니다.");

        // 회원가입단을 생성해 보세요.
        User newUser = new User();

        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());
        newUser.setNickname(request.getNickname());

        userDao.save(newUser);

        final BasicResponse result = new BasicResponse();
        result.status = true;
        result.data = "success";

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/passwordchange")
    @ApiOperation(value = "비밀번호 변경하기", notes = "회원의 비밀번호를 DB에서 수정합니다.")
    public Object passwordchange(@Valid @RequestBody SignupRequest request) {

        // 이메일로 해당하는 객체 받아오기
        User newUser = new User();
        newUser = userDao.getUserByEmail(request.getEmail());

        // 변경된 비밀번호로 설정하기
        newUser.setPassword(request.getPassword());

        // DB에 저장하기
        userDao.save(newUser);

        final BasicResponse result = new BasicResponse();
        result.status = true;
        result.data = "success";

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}