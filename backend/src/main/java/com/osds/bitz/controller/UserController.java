package com.osds.bitz.controller;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.network.request.account.ReadAuthRequest;
import com.osds.bitz.model.network.request.account.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.account.UserAuthRequest;
import com.osds.bitz.model.network.request.account.UserRequest;
import com.osds.bitz.model.network.response.account.UserAuthResponse;
import com.osds.bitz.model.network.response.account.UserResponse;
import com.osds.bitz.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/account/user")
@Api("Account 컨트롤러 API V1")
@Slf4j
public class UserController {

    private UserService userService;

    @PostMapping("/userauth")
    @ApiOperation(value = "회원가입", notes = "회원의 정보를 DB에 저장합니다.")
    public ResponseEntity<UserAuthResponse> createUser(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception {
        userService.createUser(userAuthRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("/userauth/email")
    @ApiOperation(value = "이메일 중복체크", notes = "이메일 중복체크를 시행합니다.")
    public ResponseEntity<UserAuthResponse> isDuplicatedEmail(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception {
        if(userService.isDuplicatedEmail(userAuthRequest.getEmail()))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/userauth/nickname")
    @ApiOperation(value = "닉네임 중복체크", notes = "닉네임 중복체크를 시행합니다.")
    public ResponseEntity<UserAuthResponse> isDuplicatedNickname(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception {
        if(userService.isDuplicatedNickname(userAuthRequest.getNickname()))
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/userauth/login")
    @ApiOperation(value = "로그인", notes = "회원의 정보를 통해 로그인 처리를 합니다.")
    public ResponseEntity<UserAuthResponse> readUser(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readAuthRequest) throws Exception {

        UserAuth userAuth = userService.readUser(readAuthRequest);

        // 로그인 실패
        if(userAuth == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        UserAuthResponse response = new UserAuthResponse(userAuth);
        // token 생성
        String accessToken = userService.createToken(userService.getUserAuthByEmail(readAuthRequest.getEmail()));
        response.setAccesstoken(accessToken);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/loginlog")
    @ApiOperation(value = "최초 로그인 확인", notes = "회원의 최초 로그인 여부를 DB에서 확인합니다.")
    public ResponseEntity<UserAuthResponse> readLoginLog(@RequestBody @ApiParam(value = "회원 정보") ReadAuthRequest readUAuthRequest) throws Exception {
        if(!userService.readLoginLog(readUAuthRequest.getEmail()))  // 최초로그인이 아닌 경우
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return new ResponseEntity(HttpStatus.OK);                       // 최초로그인인 경우
    }

    @PostMapping("/userprofile")
    @ApiOperation(value = "마이페이지 정보 저장", notes = "회원의 마이페이지 정보를 저장합니다.")
    public ResponseEntity<UserResponse> createProfile(@RequestBody @ApiParam(value = "회원 정보") UserRequest userRequest) throws Exception {
        userService.createProfile(userRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/userprofile")
    @ApiOperation(value = "마이페이지 정보 조회", notes = "회원의 마이페이지 정보를 조회합니다.")
    public ResponseEntity<UserResponse> readProfile(@RequestBody @ApiParam(value = "회원 정보") @RequestParam String email) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(userService.readProfile(email));
    }

    @PutMapping("/userprofile")
    @ApiOperation(value = "마이페이지 정보 수정", notes = "회원의 마이페이지 정보를 수정합니다.")
    public ResponseEntity<UserResponse> updateProfile(@RequestBody @ApiParam(value = "회원 정보") UserRequest userRequest) throws Exception {
        userService.updateProfile(userRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/userauth/password/change")
    @ApiOperation(value = "비밀번호 변경", notes = "회원의 비밀번호를 DB에서 수정합니다.")
    public ResponseEntity<UserAuthResponse> updatePassword(@RequestBody @ApiParam(value = "회원 정보") UpdatePasswordRequest updatePasswordRequest) throws Exception {
        UserAuth userAuth = userService.updatePassword(updatePasswordRequest);

        if (userAuth == null) {//기존비밀번호가 일치하지 않은 경우
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        UserAuthResponse response = new UserAuthResponse(userAuth);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/userauth/password/reset")
    @ApiOperation(value = "비밀번호 찾기", notes = "회원의 이메일에 비밀번호를 찾아서 임시 비밀번호를 이메일로 전송합니다.")
    public ResponseEntity<UserAuthResponse> resetPassword(@RequestBody @ApiParam(value = "비밀번호 찾기") UserAuthRequest userAuthRequest) throws Exception {
        UserAuth userAuth = userService.resetPassword(userAuthRequest);

        if (userAuth == null) // 이메일이 존재하지 않는 경우
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        UserAuthResponse response = new UserAuthResponse(userAuth);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/userauth")
    @ApiOperation(value = "회원탈퇴", notes = "회원의 계정을 DB에서 삭제합니다.")
    public ResponseEntity deleteUser(@RequestBody @ApiParam(value = "회원탈퇴") ReadAuthRequest readAuthRequest) throws Exception {
        userService.deleteUser(readAuthRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

}
